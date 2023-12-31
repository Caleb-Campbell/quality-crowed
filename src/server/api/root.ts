import { openaiRouter } from "~/server/api/routers/openai.router";
import { crowRouter } from "~/server/api/routers/crow.router";
import { createTRPCRouter } from "~/server/api/trpc";
import { preflightRouter } from "./routers/preflight";
import { stepRouter } from "./routers/step.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ai: openaiRouter,
  crow: crowRouter,
  preflight: preflightRouter,
  step: stepRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
