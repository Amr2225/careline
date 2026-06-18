import { AvailableSlot, Prisma } from "@careline/shared/prisma/client"

export type SlotWithTemplateName = Prisma.AvailableSlotGetPayload<{
    include: { template: { select: { name: true } } }
}>

export interface SlotWithProjectedPosition extends AvailableSlot {
    projectedPosition: number
}