import { prisma } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const serviceRouter = createTRPCRouter({
  createService: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.service.create({
        data: {
          autoBookingAccept: false,
          bookingTitle: "",
          description: "",
          isActive: false,
          name: input.name,
          slug: input.slug,
          ownerId: ctx.session.user.id,
        },
      });
    }),
});
