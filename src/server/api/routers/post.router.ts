import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findFirst({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          comments: true
        },
      });

      return post;
    }),
  getPosts: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        where: {
          categoryId: input.categoryId,
        },
        select: {
          id: true,
          title: true,
          author: true,
        },
      });

      return posts;
    }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          categoryId: input.categoryId,
          authorId: ctx.session.user.id,
        },
      });

      return post;
    }),
});
