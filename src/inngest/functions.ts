import prisma from "@/lib/db"
import { inngest } from "./client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // We can do some background work here
    await step.sleep("work 1 ", "4s")
    await step.sleep("work 2 ", "4s")

    await step.sleep("wait-a-moment", "5s")
    // return { message: `Hello ${event.data.email}!` }
    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "workflow-from-inngest",
        },
      })
    })
  }
)
