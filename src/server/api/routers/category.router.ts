import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const category = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }),
  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.create({
        data: {
          name: input.name,
        },
      });

      return category;
    }),
});
