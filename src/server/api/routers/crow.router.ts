import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";
import { prisma } from "~/server/db";


export const crowRouter = createTRPCRouter({

    getAllCrows: publicProcedure
    .input(z.object({
        userId: z.string(),
    }))
    .query( async ({ input }) => {
        const crows = await prisma.crow.findMany({
            where: {
                userId: input.userId,
            },
            include: {
                preflightQuestions: true,
                steps: true,
                prQuestions: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return crows
    }
    ),

    getCrow: publicProcedure
    .input(z.object({
        id: z.string(),
    }))
    .query( async ({ input }) => {
        try {

            const crow = await prisma.crow.findFirstOrThrow({
                where: {
                    id: input.id
                },
                include: {
                    preflightQuestions: true,
                    steps: true,
                    prQuestions: true,
                }
            })
            return crow
        }
        catch (e) {
            console.log(e)
            return null
        }
    }
    ),

    create: publicProcedure
    .input(z.object({
        userId: z.string(),
        name: z.string(),
    }))
    .mutation( async ({ input }) => {
        const crow = await prisma.crow.create({
            data: {
                userId: input.userId,
                name: input.name,
            }
        })
        return crow
    }
    ),

    deleteCrow: publicProcedure
    .input(z.object({
        id: z.string(),
    }))
    .mutation( async ({ input }) => {
        const crow = await prisma.crow.delete({
            where: {
                id: input.id
            }
        })
        return crow
    }
    ),

    archiveCrow: publicProcedure
    .input(z.object({
        id: z.string(),
    }))
    .mutation( async ({ input }) => {
        const crow = await prisma.crow.update({
            where: {
                id: input.id
            },
            data: {
                archived: true
            }
        })
        return crow
    }
    ),
    

})