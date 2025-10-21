import prisma from "@/lib/db"
import { inngest } from "./client"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createDeepSeek } from "@ai-sdk/deepseek"
import * as Sentry from "@sentry/nextjs"
const google = createGoogleGenerativeAI()
const openai = createOpenAI()
const anthropic = createAnthropic()
const deepseek = createDeepSeek()
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("queue", "5s")
    Sentry.logger.info("User triggered test log", { log_source: "sentry_test" })
    console.warn("something is wrong")
    console.error("This is an error")

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant",
        prompt: "what is 9+9*3 ?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    )
    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: "You are a helpful assistant",
        prompt: "what is 2*2 ?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    )
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-5"),
        system: "You are a helpful assistent",
        prompt: "what is 4+2 ?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    )
    const { steps: deepseekSteps } = await step.ai.wrap(
      "deepseek-generate-text",
      generateText,
      {
        model: deepseek("deepseek-chat"),
        system: "You are a helpful assistent",
        prompt: "what is 4+2 ?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    )
    return { geminiSteps, openaiSteps, anthropicSteps, deepseekSteps }
  }
)
