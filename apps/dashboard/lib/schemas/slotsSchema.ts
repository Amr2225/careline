import { z } from "zod";

export const createBulkSlotsSchema = z.object({
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime(),
    daysOfWeek: z.array(z.number().min(0).max(6)),
    startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    lunchStartTime: z.string().optional(),
    lunchEndTime: z.string().optional(),
})

export type CreateBulkSlots = z.infer<typeof createBulkSlotsSchema>;

export const createSlotSchema = z.object({
    date: z.date(),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format, expected HH:mm"),
    capacity: z.number().int().min(1).max(10).optional(),
})

export type CreateSlotForm = z.infer<typeof createSlotSchema>;