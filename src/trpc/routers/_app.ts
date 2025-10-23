import { inngest } from "@/inngest/client"
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "../init"
import prisma from "@/lib/db"

export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    })
    return { success: true, message: "Work queued" }
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    console.log({ userId: ctx.auth.user.id })
    return prisma.workflow.findMany({})
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@trpc.com",
      },
    })

    return { success: true, message: "Work queued" }
  }),
})
// export type definition of API
export type AppRouter = typeof appRouter
