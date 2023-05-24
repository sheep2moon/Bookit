import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const clientRouter = createTRPCRouter({
  newBooking: publicProcedure
    .input(
      z.object({
        serviceId: z.string(),
        clientInformation: z.string(),
        date: z.date(),
        clientContact: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.booking.create({
        data: {
          clientInformation: input.clientInformation,
          date: input.date,
          serviceId: input.serviceId,
          clientAdditionalContact: input.clientContact,
        },
      });
    }),
});
