import { z } from "zod";

export const createSlotTemplateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    weekday: z.number().min(0, "Weekday is required").max(6, "Weekday must be between 0 and 6"),
    startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid start time format, expected HH:mm"),
    endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid end time format, expected HH:mm"),
    capacityOverride: z.number().optional(),
    isActive: z.boolean().optional(),
})
export const updateSlotTemplateSchema = createSlotTemplateSchema.partial();

export type CreateSlotTemplateType = z.infer<typeof createSlotTemplateSchema>;
export type UpdateSlotTemplateType = z.infer<typeof updateSlotTemplateSchema>;