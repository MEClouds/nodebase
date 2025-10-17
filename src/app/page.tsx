import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server"
import { LogoutButton } from "./logout"

const Page = async () => {
  // requireAuth just for user experience not for security
  await requireAuth()
  //data access layer with protected procedure from tRPC
  const data = await caller.getUsers()
  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-y-5 items-center  justify-center">
      Integrate Better Auth [ Protected Server Component]
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
    </div>
  )
}
export default Page
