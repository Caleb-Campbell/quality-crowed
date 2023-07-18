import { z } from "zod"
import { prisma } from "~/server/db"
import { publicProcedure, createTRPCRouter } from "../trpc"
import { truncate } from "fs/promises"


export const stepRouter = createTRPCRouter({

    getSteps: publicProcedure
    .input(z.object({
        crowId: z.string(),
    }))
    .query( async ({ input }) => {
        const steps = await prisma.step.findMany({
            where: {
                crowId: input.crowId
            },
            include: {
                snippet: true
            }
        })
        return steps
    }
    ),

    createStep: publicProcedure
    .input(z.object({
        crowId: z.string(),
        title: z.string(),
        content: z.string(),
    }))
    .mutation( async ({ input }) => {
        const step = await prisma.step.create({
            data: {
                crowId: input.crowId,
                title: input.title,
                content: input.content,
            }
        })
        return step
    }
    ),

    createSnippet: publicProcedure
    .input(z.object({
        stepId: z.string(),
    }))
    .mutation( async ({ input }) => {
        const snippet = await prisma.snippet.create({
            data: {
                stepId: input.stepId,
                content: "",
            }
        })
        return snippet
    }
    ),

    deleteSnippet: publicProcedure
    .input(z.object({
        snippetId: z.string(),
    }))
    .mutation( async ({ input }) => {
        const snippet = await prisma.snippet.delete({
            where: {
                id: input.snippetId
            }
        })
        return snippet
    }
    ),

})