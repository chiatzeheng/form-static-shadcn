/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";


export const formRouter = createTRPCRouter({
  getAllForms: protectedProcedure
  .query(async ({ ctx }) => {
    const forms = await ctx.db.form.findMany({
      where: { createdById: ctx.session.user.id },
    });
    return forms.map((form) => ({
      id: form.id,
      title: form.title,
      description: form.description,
    }));
  }),
  createForm: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const form = await db.formSchema.create({
        data: {
          name: input.name,
          createdById: ctx.session.user.id,
          description: input.description,
        },
      });
      return { id: form.id };
    }),
  submitForm: publicProcedure
    .input(
      z.object({
        formSubmissionId: z.string(),
        values: z.array(
          z.object({
            id: z.string(),
            value: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await db.formSubmission.update({
        where: { id: input.formSubmissionId },
        data: {
          completed: true,
        },
      });
      await Promise.all(
        input.values.map(async (value) => {
          await ctx.db.formValue.update({
            where: { id: value.id },
            data: {
              value: value.value,
            },
          });
        }),
      );
    }),
  deleteForm: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.formSchema.delete({
        where: { id: input.formId },
      });
      return { success: true };
    }),
  getForm: protectedProcedure
    .query(async ({ ctx, input }) => {
      const form = await ctx.db.formSchema.findUnique({
        where: { id: input.formId },
      });
      if (!form) {
        throw new Error("Form not found");
      }
      const fields = await ctx.db.formField.findMany({
        where: { formId: form.id },
      });
      return {
        id: form.id,
        name: form.name,
        description: form.description,
        fields: fields.map((field) => ({
          id: field.id,
          name: field.name,
          type: field.type,
          required: field.required,
        })),
      };
    }),


});