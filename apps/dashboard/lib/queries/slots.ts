import { useMutation, useMutationState, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { CreateSlotPayload, slotsApi, slotTemplatesApi } from "../api/slots"
import { queryKeys } from "./keys"
import { CreateBulkSlots } from "../schemas/slotsSchema"
import { CreateSlotTemplateType, UpdateSlotTemplateType } from "../schemas/slotTemplateSchemas"
import { toast } from "sonner"
import { SlotTemplateEntity } from "@careline/shared/types/slot-templates.type"
import { extractErrorMessage } from "../errors"

// Slots
/**
 * A Hook to get the slots by date range
 */
export const useSlots = (from: string, to: string) => {
    return useQuery({
        queryKey: queryKeys.slots.getSlots(from, to),
        queryFn: () => slotsApi.getSlots(from, to),
        staleTime: 30_000,
        placeholderData: (prev) => prev
    })
}

/**
 * A Hook to create a slot
 */
export const useCreateSlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (slot: CreateSlotPayload) => slotsApi.createSlot(slot),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.slots.all })
        }
    })
}

/**
 * A Hook to create a bulk of slots
 */
export const useCreateBulkSlots = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (slots: CreateBulkSlots) => slotsApi.createBulkSlots(slots),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.slots.all })
        }
    })
}

/**
 * A Hook to get all slot templates
 */
export const useSlotTemplates = () => {
    return useQuery({
        queryKey: queryKeys.slotTemplates.all,
        queryFn: () => slotTemplatesApi.getSlotTemplates(),
        staleTime: 60_000,
        placeholderData: (prev) => prev
    })
}

/**
 * A Hook to get a slot template by id
 */
export const useSlotTemplateById = (id: string) => {
    return useSuspenseQuery({
        queryKey: queryKeys.slotTemplates.detail(id),
        queryFn: () => slotTemplatesApi.getSlotTemplateById(id),
        staleTime: 60_000,
    })
}

/**
 * A Hook to create a slot template
 */
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

/**
 * A Hook to update a slot template
 */
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

/**
 * A Hook to delete a slot template
 */
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

/*
* A Hook to delete a slot 
*/
export function useDeleteSlot(slotId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: queryKeys.slots.deleteSlot(slotId),
        mutationFn: () => slotsApi.deleteSlot(slotId),
        onSuccess: () => {
            toast.success("Slot deleted successfully")
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("by-date") })
        },
        onError: (error) => {
            toast.error("Failed to delete slot", {
                description: extractErrorMessage(error),
            })
        }
    })
}

/**
 * A Hoot to get the loading state of the delete slot mutation
 */
export function useDeleteSlotState(slotId: string) {
    const state = useMutationState({
        filters: { mutationKey: queryKeys.slots.deleteSlot(slotId) },
        select: (mutation) => mutation.state.status
    })

    return {
        isLoading: state.some(status => status === 'pending'),
    }
}