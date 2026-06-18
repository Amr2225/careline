// DbService is mocked so importing the service doesn't pull in the real Prisma client
// runtime (the @Injectable decorator metadata would otherwise load it as a value).
jest.mock('@/db/db.service', () => ({ DbService: class DbService {} }));

import { NotFoundException } from '@nestjs/common';
import { SettingsService } from './settings.service';

type SettingRow = { key: string; value: string };

function makeDb(rows: SettingRow[] = []) {
  return {
    setting: {
      findMany: jest.fn().mockResolvedValue(rows),
      findUnique: jest.fn(({ where: { key } }) =>
        Promise.resolve(rows.find((r) => r.key === key) ?? null),
      ),
    },
  };
}

describe('SettingsService.getAll', () => {
  it('folds setting rows into the typed object and defaults missing keys to empty string', async () => {
    const db = makeDb([
      { key: 'appointmentDurationMinutes', value: '45' },
      { key: 'clinicHours', value: '{"0":null}' },
      { key: 'customFlag', value: 'on' },
    ]);
    const service = new SettingsService(db as never);

    const result = await service.getAll();

    expect(result.appointmentDurationMinutes).toBe('45');
    expect(result.clinicHours).toBe('{"0":null}');
    // Extra rows are preserved on the dynamic part of the Settings type.
    expect(result.customFlag).toBe('on');
    // slotCapacity had no row, so it falls back to the default empty string.
    expect(result.slotCapacity).toBe('');
  });
});

describe('SettingsService.get', () => {
  it('throws NotFound when the requested key has no row', async () => {
    const db = makeDb([]);
    const service = new SettingsService(db as never);

    await expect(service.get('missingKey')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
