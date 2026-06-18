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

import { NotFoundException } from '@nestjs/common';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import { SlotTemplatesService } from './slot-templates.service';

const TZ = 'Africa/Cairo';
const config = { getOrThrow: jest.fn().mockReturnValue(TZ) };

const OPEN = { open: '09:00', close: '17:00' };
const ALL_DAYS_OPEN = JSON.stringify(
  Object.fromEntries(['0', '1', '2', '3', '4', '5', '6'].map((d) => [d, OPEN])),
);

function makeSettings() {
  return {
    getAll: jest.fn().mockResolvedValue({
      appointmentDurationMinutes: '30',
      slotCapacity: '1',
      clinicHours: ALL_DAYS_OPEN,
    }),
  };
}

function makeService(template: unknown) {
  const db = {
    slotTemplate: {
      findUnique: jest.fn().mockResolvedValue(template),
      update: jest.fn().mockResolvedValue({}),
    },
    availableSlot: {
      createMany: jest.fn().mockResolvedValue({ count: 0 }),
    },
  };
  const service = new SlotTemplatesService(
    db as never,
    makeSettings() as never,
    config as never,
  );
  return { db, service };
}

describe('SlotTemplatesService.materialize', () => {
  // Thursday; the template targets Sundays (weekday 0): 06-21, 06-28, ...
  const fromDate = fromZonedTime('2026-06-18T00:00:00', TZ);

  it('throws NotFound when the template is missing or inactive', async () => {
    const { db, service } = makeService(null);

    await expect(service.materialize('nope', fromDate, 4)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    // The active-only filter is part of the contract being guarded.
    expect(db.slotTemplate.findUnique).toHaveBeenCalledWith({
      where: { id: 'nope', isActive: true },
    });
    expect(db.availableSlot.createMany).not.toHaveBeenCalled();
  });

  it('generates the default-capacity slots across N weeks and stamps lastRunAt', async () => {
    const { db, service } = makeService({
      id: 't1',
      weekday: 0,
      startTime: '09:00',
      endTime: '12:00',
      capacityOverride: null,
      isActive: true,
    });

    await service.materialize('t1', fromDate, 2);

    const { data, skipDuplicates } = db.availableSlot.createMany.mock.calls[0][0];
    expect(skipDuplicates).toBe(true);

    // 6 slots/day (09:00..11:30) over the next two Sundays.
    expect(data).toHaveLength(12);
    expect(data.every((s: { capacity: number }) => s.capacity === 1)).toBe(true);
    expect(data.every((s: { templateId: string }) => s.templateId === 't1')).toBe(true);

    const rendered = data.map((s: { startTime: Date }) =>
      formatInTimeZone(s.startTime, TZ, 'yyyy-MM-dd HH:mm'),
    );
    expect(rendered[0]).toBe('2026-06-21 09:00');
    expect(rendered).toContain('2026-06-21 11:30');
    expect(rendered).toContain('2026-06-28 09:00');

    const updateCall = db.slotTemplate.update.mock.calls[0][0];
    expect(updateCall.where).toEqual({ id: 't1' });
    expect(updateCall.data.lastRunAt).toBeInstanceOf(Date);
  });

  it('uses the template capacity override instead of the default capacity', async () => {
    const { db, service } = makeService({
      id: 't1',
      weekday: 0,
      startTime: '09:00',
      endTime: '10:00',
      capacityOverride: 4,
      isActive: true,
    });

    await service.materialize('t1', fromDate, 1);

    const { data } = db.availableSlot.createMany.mock.calls[0][0];
    expect(data.every((s: { capacity: number }) => s.capacity === 4)).toBe(true);
  });
});
