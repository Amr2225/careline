import { api } from "@/lib/api";
import type { AxiosRequestConfig } from "axios";
import { CreateSlotTemplateType, UpdateSlotTemplateType } from "../schemas/slotTemplateSchemas";
import { AvailableSlot, SlotTemplate } from "@careline/shared/prisma/client";
import { CreateBulkSlots } from "../schemas/slotsSchema";
import { SlotTemplateEntity } from "@careline/shared/types/slot-templates.type";
import { SlotWithTemplateName } from "@careline/shared/types/slots.type";

export interface CreateSlotPayload {
    startDateTime: string;
    capacity?: number;
}

export const slotsApi = {
    getSlots: async (from: string, to: string): Promise<SlotWithTemplateName[]> => {
        const { data } = await api.get<SlotWithTemplateName[]>('/slots', { params: { from, to } });
        return data;
    },
    createSlot: async (slot: CreateSlotPayload): Promise<AvailableSlot> => {
        const { data } = await api.post<AvailableSlot>('/slots', slot);
        return data;
    },
    createBulkSlots: async (slots: CreateBulkSlots): Promise<{ message: string }> => {
        const { data } = await api.post<{ message: string }>('/slots/bulk', slots);
        return data;
    }
}

export const slotTemplatesApi = {
    createSlotTemplate: async (template: CreateSlotTemplateType): Promise<SlotTemplate> => {
        const { data } = await api.post<SlotTemplate>('/slot-templates', template);
        return data;
    },
    getSlotTemplates: async (config?: AxiosRequestConfig): Promise<SlotTemplateEntity[]> => {
        const { data } = await api.get<SlotTemplateEntity[]>('/slot-templates', config);
        return data;
    },
    getSlotTemplateById: async (id: string, config?: AxiosRequestConfig): Promise<SlotTemplateEntity> => {
        const { data } = await api.get<SlotTemplateEntity>(`/slot-templates/${id}`, config);
        return data;
    },
    updateSlotTemplate: async (id: string, template: UpdateSlotTemplateType): Promise<SlotTemplateEntity> => {
        const { data } = await api.patch<SlotTemplateEntity>(`/slot-templates/${id}`, template);
        return data;
    },
    deleteSlotTemplate: async (id: string): Promise<string> => {
        const { data } = await api.delete<{ message: string }>(`/slot-templates/${id}`);
        return data.message;
    },
    materializeSlots: async (templateId: string, fromDate: string, weeks: number): Promise<string> => {
        const { data } = await api.post<{ message: string }>(`/slot-templates/${templateId}/materialize`, { fromDate, weeks });
        return data.message;
    }
}
