// DbService/SettingsService are mocked so importing the service doesn't load the
// real Prisma client runtime via @Injectable decorator metadata.
jest.mock('@/db/db.service', () => ({ DbService: class DbService {} }));
jest.mock('@/settings/settings.service', () => ({ SettingsService: class SettingsService {} }));

import { WalkInCapacityService } from './walk-in-capacity.service';

function makeSettings(overrides: Record<string, string> = {}) {
    return {
        getAll: jest.fn().mockResolvedValue({
            appointmentDurationMinutes: '30',
            slotCapacity: '1',
            clinicHours: '{}',
            walkInEnabled: 'true',
            walkInMaxQueueLength: '5',
            ...overrides,
        }),
    };
}

describe('WalkInCapacityService', () => {
    function makeService(settings: ReturnType<typeof makeSettings>, activeCount: number) {
        const db = { ticket: { count: jest.fn().mockResolvedValue(activeCount) } };
        return new WalkInCapacityService(db as any, settings as any);
    }

    it('blocks when walk-ins are switched off', async () => {
        const service = makeService(makeSettings({ walkInEnabled: 'false' }), 0);
        await expect(service.check()).resolves.toEqual({ allowed: false, reason: expect.any(String) });
    });

    it('blocks when the max-queue-length setting is not a number', async () => {
        const service = makeService(makeSettings({ walkInMaxQueueLength: '' }), 0);
        const result = await service.check();
        expect(result.allowed).toBe(false);
    });

    it('blocks when the active queue is at or above the cap', async () => {
        const service = makeService(makeSettings({ walkInMaxQueueLength: '5' }), 5);
        const result = await service.check();
        expect(result.allowed).toBe(false);
    });

    it('allows when enabled and under the cap', async () => {
        const service = makeService(makeSettings({ walkInMaxQueueLength: '5' }), 4);
        await expect(service.check()).resolves.toEqual({ allowed: true });
    });
});
