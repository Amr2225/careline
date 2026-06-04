import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { CreateSlotPayload, slotsApi, slotTemplatesApi } from "../api/slots"
import { queryKeys } from "./keys"
import { CreateBulkSlots } from "../schemas/slotsSchema"
import { CreateSlotTemplateType, UpdateSlotTemplateType } from "../schemas/slotTemplateSchemas"
import { toast } from "sonner"
import { SlotTemplateEntity } from "@careline/shared/types/slot-templates.type"

// Slots
export const useSlots = (from: string, to: string) => {
    return useQuery({
        queryKey: queryKeys.slots.getSlots(from, to),
        queryFn: () => slotsApi.getSlots(from, to),
        staleTime: 30_000,
        placeholderData: (prev) => prev
    })
}

export const useCreateSlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (slot: CreateSlotPayload) => slotsApi.createSlot(slot),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.slots.all })
        }
    })
}

export const useCreateBulkSlots = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (slots: CreateBulkSlots) => slotsApi.createBulkSlots(slots),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.slots.all })
        }
    })
}

// SLots Template
export const useSlotTemplates = () => {
    return useQuery({
        queryKey: queryKeys.slotTemplates.all,
        queryFn: () => slotTemplatesApi.getSlotTemplates(),
        staleTime: 60_000,
        placeholderData: (prev) => prev
    })
}

export const useSlotTemplateById = (id: string) => {
    return useSuspenseQuery({
        queryKey: queryKeys.slotTemplates.detail(id),
        queryFn: () => slotTemplatesApi.getSlotTemplateById(id),
        staleTime: 60_000,
    })
}

export const useCreateSlotTemplate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (template: CreateSlotTemplateType) => slotTemplatesApi.createSlotTemplate(template),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.slotTemplates.all, (old: SlotTemplateEntity[]) => (old ? [...old, data] : [data]))
            void queryClient.invalidateQueries({ queryKey: queryKeys.slotTemplates.all })
        }
    })
}

export const useUpdateSlotTemplate = (id?: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ template, templateId }: { template: UpdateSlotTemplateType, templateId?: string }) => slotTemplatesApi.updateSlotTemplate(id ?? templateId ?? "", template),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.slotTemplates.detail(id ?? data.id), data)
            void queryClient.invalidateQueries({ queryKey: queryKeys.slotTemplates.all })
        }
    })
}

export const useDeleteSlotTemplate = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => slotTemplatesApi.deleteSlotTemplate(id),
        onSuccess: () => {
            toast.success("Template deleted successfully")
            void queryClient.invalidateQueries({ queryKey: queryKeys.slotTemplates.all })
        }
    })
}