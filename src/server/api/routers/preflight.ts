import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";
import { prisma } from "~/server/db";


export const preflightRouter = createTRPCRouter({


    updatePreflight: publicProcedure
    .input(z.object({
        id: z.string(),
        response: z.string(),
    }))
    .mutation( async ({ input }) => {
        const preflight = await prisma.preFlightQuestion.update({
            where: {
                id: input.id
            },
            data: {
                response: input.response
            }
        })
        return preflight

    }
    ),


})