import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.create({
        data: {
          content: input.content,
          postId: input.postId,
          authorId: ctx.session.user.id,
        },
      });

      return comment;
    }),
});
