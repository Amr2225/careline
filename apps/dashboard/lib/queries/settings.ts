import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { settingsApi, type UpdateSettingsInput } from "../api/settings";

export const useSettings = () => {
    return useQuery({
        queryKey: queryKeys.settings.get(),
        queryFn: () => settingsApi.getSettings(),
        staleTime: 60_000,
        placeholderData: (prev) => prev

    })
}

export const useUpdateSettings = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (input: UpdateSettingsInput) => settingsApi.updateSettings(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.settings.get() })
        }
    })
}