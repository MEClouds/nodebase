import { Button } from "@/components/ui/button"

const Page = () => {
  const something = true
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Setup Project
      <Button className="m-4" variant={"outline"} size={"sm"}>
        Start
      </Button>
    </div>
  )
}
export default Page
