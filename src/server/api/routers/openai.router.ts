import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { createQuestions } from "../services/openai.service";
import { prisma } from "~/server/db";

export const openaiRouter = createTRPCRouter({

  createQuestions: publicProcedure
  .input(z.object({
    prompt: z.string(),
    crowId: z.string(),
  }))
  .mutation(
    async ({ input }) => {
      const questions = await createQuestions({prompt: input.prompt})
      if(questions) {
        // create preflight questions list in db where crowId is
        questions.forEach(async (question: any) => {
          await prisma.preFlightQuestion.create({
            data: {
              question: question.question,
              crowId: input.crowId
            }
          })
        })
        return questions


      }
    }
)

});
