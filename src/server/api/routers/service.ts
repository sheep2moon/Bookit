import { addHours, eachDayOfInterval } from "date-fns";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import type { Slot } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const serviceRouter = createTRPCRouter({
  checkSlugAvailability: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const res = await ctx.prisma.service.findFirst({
        where: {
          slug: input.slug,
        },
      });
      if (res) return true;
      return false;
    }),
  createService: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.service.create({
          data: {
            autoBookingAccept: false,
            description: "",
            isActive: false,
            name: input.name,
            slug: input.slug,
            ownerId: ctx.session.user.id,
          },
        });
        return { sucess: true };
      } catch (error) {
        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return { sucess: false };
          }
        }
      }
    }),
  setDescription: protectedProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.service.update({
        where: { id: ctx.session.user.serviceId },
        data: { description: input.description },
      });
    }),
  setContact: protectedProcedure
    .input(z.object({ phone: z.number(), email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.service.update({
        where: { id: ctx.session.user.serviceId },
        data: { phoneNumber: input.phone, email: input.email },
      });
    }),
  setAutoBookingAccept: protectedProcedure
    .input(z.object({ newState: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.service.update({
        where: { id: ctx.session.user.serviceId },
        data: { autoBookingAccept: input.newState },
      });
    }),
  setIsActive: protectedProcedure
    .input(z.object({ newState: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.service.update({
        where: { id: ctx.session.user.serviceId },
        data: { isActive: input.newState },
      });
    }),
  addFreeSlot: protectedProcedure
    .input(
      z.object({
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.slot.create({
        data: {
          date: input.date,
          isFree: true,
          serviceId: ctx.session.user.serviceId,
        },
      });
    }),
  fillFreeSlots: protectedProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        dailyHours: z.array(z.number().min(0).max(23)),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const days = eachDayOfInterval({ start: input.start, end: input.end });
      const slots: Omit<Slot, "id">[] = [];
      days.forEach((day) => {
        const daySlots = input.dailyHours.forEach((hours) =>
          slots.push({
            isFree: false,
            serviceId: ctx.session.user.id,
            date: addHours(day, hours),
          })
        );
        return daySlots;
      });

      await ctx.prisma.slot.createMany({ data: slots });
    }),
});
