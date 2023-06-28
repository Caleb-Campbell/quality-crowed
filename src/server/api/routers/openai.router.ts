import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { useAI } from "../services/openai.service";

export const openaiRouter = createTRPCRouter({

  create: publicProcedure
  .input(z.object({
    prompt: z.string(),
  }))
  .mutation(
    async ({ input }) => await useAI(input.prompt)
)

});
