import { SlotTemplate } from "@careline/shared/prisma/client";

export interface SlotTemplateEntity extends SlotTemplate {
    generatedSlots: number;
}
