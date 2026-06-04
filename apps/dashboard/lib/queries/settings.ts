import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { settingsApi } from "../api/settings";

export const useSettings = () => {
    return useQuery({
        queryKey: queryKeys.settings.get(),
        queryFn: () => settingsApi.getSettings(),
        staleTime: 60_000,
        placeholderData: (prev) => prev
        
    })
}