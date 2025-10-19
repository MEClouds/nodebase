"use client"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "./logout"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"

const Page = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI Job queued")
      },
    })
  )

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued")
      },
    })
  )

  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-y-5 items-center  justify-center">
      Workflow [ Protected Server Component]
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <LogoutButton />
    </div>
  )
}
export default Page
