import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DbService } from "@/db/db.service";
import { LATE_FLIP_LEAD_MINUTES, NO_SHOW_HOURS } from "./arrival.constants";

const LATE_FLIP_LEAD_MS = LATE_FLIP_LEAD_MINUTES * 60_000;
const NO_SHOW_MS = NO_SHOW_HOURS * 60 * 60_000;

@Injectable()
export class ArrivalCron {
    private readonly logger = new Logger(ArrivalCron.name);

    constructor(private readonly dbService: DbService) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async flipLateArrivingStatuses() {
        this.logger.log("Flipping BOOKED -> LATE_ARRIVING statuses");
        try {
            const lateFlipThreshold = new Date(Date.now() + LATE_FLIP_LEAD_MS);
            const { count } = await this.dbService.appointment.updateMany({
                where: {
                    status: "BOOKED",
                    slot: { startTime: { lte: lateFlipThreshold } }
                },
                data: {
                    status: "LATE_ARRIVING",
                }
            });
            this.logger.log(`Flipped ${count} appointment(s) to LATE_ARRIVING`);
        } catch (error) {
            this.logger.error("Failed to flip late arriving statuses", error instanceof Error ? error.stack : error);
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    async autoMarkNoShows() {
        this.logger.log("Auto-marking no-shows");
        try {
            const cutoff = new Date(Date.now() - NO_SHOW_MS);

            // updateMany can't decrement a related table per-row, so first find the
            // affected appointments to know which slots' capacity to free.
            const affected = await this.dbService.appointment.findMany({
                where: {
                    status: { in: ["BOOKED", "LATE_ARRIVING"] },
                    slot: { startTime: { lt: cutoff } }
                },
                select: { id: true, slotId: true }
            });

            if (affected.length === 0) {
                this.logger.log("Auto-marked 0 appointment(s) as NO_SHOW");
                return;
            }

            const appointmentIds = affected.map((a) => a.id);

            // Count how many newly-no-showed appointments belong to each slot.
            const decrementBySlotId = new Map<string, number>();
            for (const { slotId } of affected) {
                decrementBySlotId.set(slotId, (decrementBySlotId.get(slotId) ?? 0) + 1);
            }

            await this.dbService.$transaction(async (tx) => {
                await tx.appointment.updateMany({
                    where: { id: { in: appointmentIds } },
                    data: {
                        status: "NO_SHOW",
                        noShowAt: new Date(),
                        noShowMarkedById: null,
                    }
                });

                for (const [slotId, count] of decrementBySlotId) {
                    await tx.availableSlot.update({
                        where: { id: slotId },
                        data: { bookedCount: { decrement: count } }
                    });
                }
            });

            this.logger.log(`Auto-marked ${affected.length} appointment(s) as NO_SHOW`);
        } catch (error) {
            this.logger.error("Failed to auto-mark no-shows", error instanceof Error ? error.stack : error);
        }
    }


}
