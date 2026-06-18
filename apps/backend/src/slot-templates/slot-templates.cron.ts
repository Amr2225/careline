import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { DbService } from "@/db/db.service";
import { SlotTemplatesService } from "./slot-templates.service";
import { startOfNextWeekSunday } from "@/common/date.util";

// Number of weeks to materialize ahead on each run.
const MATERIALIZE_WEEKS = 1;

@Injectable()
export class SlotTemplatesCron {
    private readonly logger = new Logger(SlotTemplatesCron.name);

    constructor(
        private readonly dbService: DbService,
        private readonly slotTemplatesService: SlotTemplatesService,
        private readonly configService: ConfigService,
    ) { }

    // Runs every Sunday at 02:00 in the clinic timezone. The decorator's timeZone
    // option is resolved at class-definition time, so it reads the raw TIMEZONE env
    // var (the same source ConfigService validates and exposes at boot).
    @Cron('0 2 * * 0', { timeZone: process.env.TIMEZONE ?? 'UTC' })
    async autoMaterializeTemplates() {
        this.logger.log("Auto-materializing active slot templates for the next week");
        try {
            const timezone = this.configService.getOrThrow<string>('TIMEZONE');
            const fromDate = startOfNextWeekSunday(new Date(), timezone);

            const templates = await this.dbService.slotTemplate.findMany({ where: { isActive: true } });
            this.logger.log(`Found ${templates.length} active template(s) to materialize`);

            let totalCreated = 0;
            for (const template of templates) {
                try {
                    const { count } = await this.slotTemplatesService.materialize(template.id, fromDate, MATERIALIZE_WEEKS);
                    totalCreated += count;
                    this.logger.log(`Template ${template.id} (${template.name}) materialized ${count} slot(s)`);
                } catch (error) {
                    this.logger.error(`Failed to materialize template ${template.id} (${template.name})`, error instanceof Error ? error.stack : error);
                }
            }

            this.logger.log(`Auto-materialization complete: created ${totalCreated} slot(s) across ${templates.length} template(s)`);
        } catch (error) {
            this.logger.error("Failed to auto-materialize slot templates", error instanceof Error ? error.stack : error);
        }
    }
}
