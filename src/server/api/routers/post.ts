import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { v4 as uuidv4 } from 'uuid';

export const formRouter = createTRPCRouter({
  getAllForms: protectedProcedure
  .query(async ({ ctx }) => {
    const forms = await ctx.db.form.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
    });
    return forms.map((form) => ({
      id: form.id,
      name: form.name,
      description: form.description,
      answerId: form.answerId
    }));
  }),
  createForm: protectedProcedure
  .input(z.object({ name: z.string().min(1), description: z.string().min(1)}))
  .mutation(async ({ ctx, input }) => {
    const form = await ctx.db.form.create({
      data: {
        name: input.name,
        description: input.description,
        createdBy: { connect: { id: ctx.session.user.id } },
        answerId: uuidv4()
      },
    })
    return { id: form.id };
  }),
  deleteForm: protectedProcedure
  .input(
    z.object({
      formId: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.db.form.delete({
      where: { id: input.formId },
    });
    return { success: true };
  }),
  submitAnswer: protectedProcedure.input(
    z.object({
      id: z.string(),
      username: z.string(),
      password: z.string(),
      acceptTerms: z.boolean(),
      birthday: z.date(),
      description: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    console.log(input)
    await ctx.db.formAnswer.update({
      where: { id: input.id },
      data: {
        username: input.username,
        password: input.password,
        acceptTerms: input.acceptTerms,
        birthday: input.birthday,
        description: input.description,
      },
    });
  }),
  
});