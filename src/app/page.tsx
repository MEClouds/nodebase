import { Button } from "@/components/ui/button"
import { getQueryClient, trpc } from "@/trpc/server"
import { Client } from "./client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

const Page = async () => {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Integrate TRPC
      <Button className="m-4" variant={"outline"} size={"sm"}>
        Done
      </Button>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading...</p>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}
export default Page
