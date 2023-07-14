import { z } from "zod"
import { prisma } from "~/server/db"
import { publicProcedure, createTRPCRouter } from "../trpc"


export const stepRouter = createTRPCRouter({

    getSteps: publicProcedure
    .input(z.object({
        crowId: z.string(),
    }))
    .query( async ({ input }) => {
        const steps = await prisma.step.findMany({
            where: {
                crowId: input.crowId
            }
        })
        return steps
    }
    ),
})