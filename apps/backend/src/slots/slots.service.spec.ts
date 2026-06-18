// DbService is mocked so importing the service doesn't pull in the real Prisma client
// runtime (broken in this env). The Prisma client module is mocked too because the
// service uses Prisma.PrismaClientKnownRequestError as a value (instanceof) in catch blocks.
jest.mock('@/db/db.service', () => ({ DbService: class DbService {} }));
jest.mock('@careline/shared/prisma/client', () => ({
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {
      code: string;
      constructor(message: string, meta?: { code?: string }) {
        super(message);
        this.name = 'PrismaClientKnownRequestError';
        this.code = meta?.code ?? '';
      }
    },
  },
}));

import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@careline/shared/prisma/client';
import { formatInTimeZone } from 'date-fns-tz';
import { SlotsService } from './slots.service';
import { CreateBulkSlotsDto, CreateSlotDto } from './dto/create-slot.dto';

const TZ = 'Africa/Cairo';

// Renders an instant as its Cairo wall-clock for stable, offset-independent assertions.
function formatStart(d: Date): string {
  return formatInTimeZone(d, TZ, 'yyyy-MM-dd HH:mm');
}

// A clinic-hours map keyed by weekday (0=Sun..6=Sat). The production code only
// checks truthiness of each entry, so the open/close values are illustrative.
const OPEN = { open: '09:00', close: '17:00' };
function clinicHours(overrides: Record<string, unknown> = {}) {
  const base: Record<string, unknown> = {
    '0': OPEN,
    '1': OPEN,
    '2': OPEN,
    '3': OPEN,
    '4': OPEN,
    '5': OPEN,
    '6': OPEN,
  };
  return JSON.stringify({ ...base, ...overrides });
}

function makeSettings(value: {
  appointmentDurationMinutes?: string;
  slotCapacity?: string;
  clinicHours?: string;
}) {
  return {
    getAll: jest.fn().mockResolvedValue({
      appointmentDurationMinutes: '30',
      slotCapacity: '1',
      clinicHours: clinicHours(),
      ...value,
    }),
  };
}

const config = { getOrThrow: jest.fn().mockReturnValue(TZ) };

describe('SlotsService.create', () => {
  it('rejects assigning a slot to a non-working day', async () => {
    const db = { availableSlot: { create: jest.fn() } };
    // Thursday (weekday 4) is closed; 2026-06-18 is a Thursday in Cairo.
    const settings = makeSettings({ clinicHours: clinicHours({ '4': null }) });
    const service = new SlotsService(db as never, config as never, settings as never);

    const dto: CreateSlotDto = { startDateTime: new Date('2026-06-18T09:00:00Z') };

    await expect(service.create(dto)).rejects.toBeInstanceOf(BadRequestException);
    expect(db.availableSlot.create).not.toHaveBeenCalled();
  });

  it('maps a Prisma P2002 unique-constraint violation to a ConflictException', async () => {
    const duplicate = new Prisma.PrismaClientKnownRequestError('duplicate', {
      code: 'P2002',
      clientVersion: '7.8.0',
    });
    const db = { availableSlot: { create: jest.fn().mockRejectedValue(duplicate) } };
    const settings = makeSettings({}); // all days open
    const service = new SlotsService(db as never, config as never, settings as never);

    const dto: CreateSlotDto = { startDateTime: new Date('2026-06-18T09:00:00Z') };

    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
  });
});

describe('SlotsService.createBulk', () => {
  function makeBulkDb() {
    return {
      availableSlot: {
        createMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
  }

  it('throws when clinic hours are not configured', async () => {
    const db = makeBulkDb();
    const settings = makeSettings({ clinicHours: '' });
    const service = new SlotsService(db as never, config as never, settings as never);

    const dto: CreateBulkSlotsDto = {
      startDate: '2026-06-15',
      endDate: '2026-06-17',
      startTime: '09:00',
      endTime: '12:00',
      daysOfWeek: [1, 2, 3],
    };

    await expect(service.createBulk(dto)).rejects.toBeInstanceOf(BadRequestException);
    expect(db.availableSlot.createMany).not.toHaveBeenCalled();
  });

  it('generates per-day slots, skips the lunch window, and omits non-working days', async () => {
    const db = makeBulkDb();
    // Tuesday (weekday 2) is a holiday; Mon 06-15 and Wed 06-17 remain working.
    const settings = makeSettings({ clinicHours: clinicHours({ '2': null }) });
    const service = new SlotsService(db as never, config as never, settings as never);

    const dto: CreateBulkSlotsDto = {
      startDate: '2026-06-15', // Monday
      endDate: '2026-06-17', // Wednesday
      startTime: '09:00',
      endTime: '12:00',
      lunchStartTime: '10:00',
      lunchEndTime: '10:30',
      daysOfWeek: [1, 2, 3],
    };

    await service.createBulk(dto);

    expect(db.availableSlot.createMany).toHaveBeenCalledTimes(1);
    const { data, skipDuplicates } = db.availableSlot.createMany.mock.calls[0][0];
    expect(skipDuplicates).toBe(true);

    // 5 slots per working day (09:00, 09:30, 10:30, 11:00, 11:30) over 2 days.
    expect(data).toHaveLength(10);
    expect(data.every((s: { capacity: number }) => s.capacity === 1)).toBe(true);

    const rendered = data.map((s: { startTime: Date }) =>
      formatStart(s.startTime),
    );
    // Lunch slot 10:00 is never created.
    expect(rendered).not.toContain('2026-06-15 10:00');
    // Tuesday 06-16 is excluded entirely.
    expect(rendered.some((r: string) => r.startsWith('2026-06-16'))).toBe(false);
    expect(rendered).toEqual([
      '2026-06-15 09:00',
      '2026-06-15 09:30',
      '2026-06-15 10:30',
      '2026-06-15 11:00',
      '2026-06-15 11:30',
      '2026-06-17 09:00',
      '2026-06-17 09:30',
      '2026-06-17 10:30',
      '2026-06-17 11:00',
      '2026-06-17 11:30',
    ]);
  });

  it('omits days excluded by the daysOfWeek filter', async () => {
    const db = makeBulkDb();
    const settings = makeSettings({}); // all days open
    const service = new SlotsService(db as never, config as never, settings as never);

    const dto: CreateBulkSlotsDto = {
      startDate: '2026-06-15', // Monday
      endDate: '2026-06-17', // Wednesday
      startTime: '09:00',
      endTime: '12:00',
      daysOfWeek: [1, 3], // Tuesday omitted by request
    };

    await service.createBulk(dto);

    const { data } = db.availableSlot.createMany.mock.calls[0][0];
    const rendered = data.map((s: { startTime: Date }) => formatStart(s.startTime));
    // 6 slots/day with no lunch, only Mon + Wed.
    expect(data).toHaveLength(12);
    expect(rendered.some((r: string) => r.startsWith('2026-06-16'))).toBe(false);
  });
});

describe('SlotsService.deleteSlot', () => {
  it('throws NotFound when the slot does not exist', async () => {
    const db = { availableSlot: { findUnique: jest.fn().mockResolvedValue(null) } };
    const service = new SlotsService(db as never, config as never, makeSettings({}) as never);

    await expect(service.deleteSlot('missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('refuses deletion when the slot has active (non-cancelled/no-show) appointments', async () => {
    const db = {
      availableSlot: {
        findUnique: jest.fn().mockResolvedValue({
          id: 's1',
          appointments: [{ status: 'IN_PROGRESS' }, { status: 'CANCELLED' }],
        }),
      },
      $transaction: jest.fn(),
    };
    const service = new SlotsService(db as never, config as never, makeSettings({}) as never);

    await expect(service.deleteSlot('s1')).rejects.toBeInstanceOf(BadRequestException);
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('deletes the slot and its appointments when only cancelled/no-show remain', async () => {
    const tx = {
      appointment: { deleteMany: jest.fn().mockResolvedValue({ count: 1 }) },
      availableSlot: { delete: jest.fn().mockResolvedValue({}) },
    };
    const db = {
      availableSlot: {
        findUnique: jest.fn().mockResolvedValue({
          id: 's1',
          appointments: [{ status: 'CANCELLED' }, { status: 'NO_SHOW' }],
        }),
      },
      $transaction: jest.fn(async (cb: (t: typeof tx) => unknown) => cb(tx)),
    };
    const service = new SlotsService(db as never, config as never, makeSettings({}) as never);

    await service.deleteSlot('s1');

    expect(tx.appointment.deleteMany).toHaveBeenCalledWith({ where: { slotId: 's1' } });
    expect(tx.availableSlot.delete).toHaveBeenCalledWith({ where: { id: 's1' } });
  });
});

describe('SlotsService.getAvailableSlots', () => {
  function dbWithSlots(slots: unknown[]) {
    return {
      availableSlot: {
        fields: { capacity: 'capacity' },
        findMany: jest.fn().mockResolvedValue(slots),
      },
    };
  }

  it('projects each slot position from the cumulative capacity of preceding slots', async () => {
    const db = dbWithSlots([
      { id: 'a', startTime: new Date(), capacity: 1, bookedCount: 0, appointments: [] },
      { id: 'b', startTime: new Date(), capacity: 2, bookedCount: 0, appointments: [] },
      { id: 'c', startTime: new Date(), capacity: 3, bookedCount: 0, appointments: [] },
    ]);
    const service = new SlotsService(db as never, config as never, makeSettings({}) as never);

    const result = await service.getAvailableSlots('2026-06-18');

    // slice(0, index) cumulative sum + 1: [0+1, 1+1, (1+2)+1].
    expect(result.map((s) => s.projectedPosition)).toEqual([1, 2, 4]);
  });
});

describe('SlotsService.getNextAvailableSlot', () => {
  it('returns null when no upcoming slot has capacity', async () => {
    const db = {
      availableSlot: {
        fields: { capacity: 'capacity' },
        findFirst: jest.fn().mockResolvedValue(null),
      },
    };
    const service = new SlotsService(db as never, config as never, makeSettings({}) as never);

    expect(await service.getNextAvailableSlot()).toBeNull();
  });

  it('projects the next slot position from preceding capacities plus its own booked count', async () => {
    const slot = { id: 'next', startTime: new Date('2026-06-18T09:00:00Z'), capacity: 5, bookedCount: 1 };
    const db = {
      availableSlot: {
        fields: { capacity: 'capacity' },
        findFirst: jest.fn().mockResolvedValue(slot),
        findMany: jest.fn().mockResolvedValue([
          { capacity: 2 },
          { capacity: 3 },
        ]),
      },
    };
    const service = new SlotsService(db as never, config as never, makeSettings({}) as never);

    const result = await service.getNextAvailableSlot();

    // (2 + 3) preceding capacity + bookedCount(1) + 1 = 7.
    expect(result?.projectedPosition).toBe(7);
  });
});
