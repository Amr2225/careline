import { Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { SettingsService } from '@/settings/settings.service';
import { ACTIVE_TICKET_STATUSES } from './queue.constants';

export interface CapacityResult {
    allowed: boolean;
    reason?: string;
}

@Injectable()
export class WalkInCapacityService {
    constructor(private readonly dbService: DbService, private readonly settingsService: SettingsService) { }

    // Walk-ins are accepted only when the switch is on AND the live queue is under
    // the configured length. Both gates are clinic-configurable in Settings.
    async check(): Promise<CapacityResult> {
        const settings = await this.settingsService.getAll();

        if (settings.walkInEnabled !== 'true') {
            return { allowed: false, reason: 'Walk-ins are currently closed.' };
        }

        const maxQueueLength = Number.parseInt(settings.walkInMaxQueueLength, 10);
        if (!Number.isFinite(maxQueueLength)) {
            return { allowed: false, reason: 'Walk-in capacity is not configured.' };
        }

        const activeCount = await this.dbService.ticket.count({
            where: { status: { in: ACTIVE_TICKET_STATUSES } },
        });
        if (activeCount >= maxQueueLength) {
            return { allowed: false, reason: 'The queue is full right now. Please try again shortly.' };
        }

        return { allowed: true };
    }
}
