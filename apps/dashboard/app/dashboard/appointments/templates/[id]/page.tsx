import { slotTemplatesApi } from "@/lib/api/slots"
import { withServerCookies } from "@/lib/server-cookies"
import { Suspense } from "react"
import SlotTemplateForm from "./_components/form"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { queryKeys } from "@/lib/queries/keys"
import { TemplateDetailSkeleton } from "./_components/TemplateDetailSkeleton"

interface TemplateDetailPageProps {
  params: Promise<{ id: string }>
}
export default async function TemplateDetailPage({
  params,
}: TemplateDetailPageProps) {
  const queryClient = new QueryClient()
  const { id } = await params
  const config = await withServerCookies()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.slotTemplates.detail(id),
    queryFn: () => slotTemplatesApi.getSlotTemplateById(id, config),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<TemplateDetailSkeleton />}>
        <SlotTemplateForm id={id} />
      </Suspense>
    </HydrationBoundary>
  )
}
