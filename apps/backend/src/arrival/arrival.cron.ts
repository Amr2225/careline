import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DbService } from "@/db/db.service";

const FIVE_MINUTES_IN_MS = 5 * 60_000;
const DAY_IN_MS = 24 * 60 * 60_000;

@Injectable()
export class ArrivalCron {
    constructor(private readonly dbService: DbService) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async flipLateArrivingStatuses() {
        console.log("FLIPPING LATE ARRIVING STATUSES")
        const fiveMinFromNow = new Date(Date.now() + FIVE_MINUTES_IN_MS);
        await this.dbService.appointment.updateMany({
            where: {
                status: "BOOKED",
                slot: { startTime: { lte: fiveMinFromNow } }
            },
            data: {
                status: "LATE_ARRIVING",
            }
        });
    }

    @Cron(CronExpression.EVERY_HOUR)
    async autoMarkNoShows() {
        console.log("AUTO MARK NO SHOWS")
        const twentyFourHoursAgo = new Date(Date.now() - DAY_IN_MS);
        await this.dbService.appointment.updateMany({
            where: {
                status: { in: ["BOOKED", "LATE_ARRIVING"] },
                slot: { startTime: { lt: twentyFourHoursAgo } }
            },
            data: {
                status: "NO_SHOW",
                noShowAt: new Date(),
                noShowMarkedById: null,
            }
        });
    }


}