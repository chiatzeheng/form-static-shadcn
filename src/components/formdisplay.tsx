"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import type { FormSubmission } from "@/types/types";
import { api } from "@/utils/api";
import { toast } from  "react-hot-toast"
import { useRouter } from "next/router"


// Define your form schema using zod
const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),


 
  // Date will show a date picker
  birthday: z.coerce.date().optional(),

  description:z
  .string()
  .min(10, {
    message: "Bio must be at least 10 characters.",
  })
  .max(160, {
    message: "Bio must not be longer than 30 characters.",
  })
  .optional(),

  acceptTerms: z
  .boolean()
  .describe("Accept terms and conditions.")
  .refine((value) => value, {
    message: "You must accept the terms and conditions.",
    path: ["acceptTerms"],
  }),
});

export default function FormDisplay() {

 
  const submitAnswers = api.form.submitAnswer.useMutation();
  const router = useRouter()


  const handleOnSubmit = async (data: FormSubmission) =>  {

    const newid =  router.query.id
    const newdata = {id: newid, ...data}
    console.log(newdata)

     try {
       await submitAnswers.mutateAsync(newdata),
          {
            onSuccess: () => {
              toast.success("success");
            },
            onError: (error) => {
              toast.error(error);
            },
          }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="mx-auto my-6 max-w-lg">
    <Card>
      <CardHeader>
        <CardTitle>INC BE Form</CardTitle>
        <CardDescription>
          Please fill out the form below to submit your request.
        </CardDescription>
      </CardHeader>

      <CardContent>
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      onSubmit={handleOnSubmit}
      
    
      fieldConfig={{
        password: {
          inputProps: {
            type: "password",
            placeholder: "••••••••",
          },
        },
       

        birthday: {
          description: "We need your birthday to send you a gift.",
        },

        description: {
          inputProps: {
            type: "textarea",
            placeholder: "Please describe your request.",
          },
        },

        acceptTerms: {
          inputProps: {
            required: true,
          },
          // You can use JSX in the description
          description: (
            <>
              I agree to the{" "}
              <a
                href="#"
                className="text-primary underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Terms and conditions clicked.");
                }}
              >
                terms and conditions
              </a>
              .
            </>
          ),
        },


      }}
    >
      {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
      <AutoFormSubmit>Send now</AutoFormSubmit>

      {/*
      All children passed to the form will be rendered below the form.
      */}
      <p className="text-gray-500 text-sm">
        By submitting this form, you agree to our{" "}
        <a href="#" className="text-primary underline">
          terms and conditions
        </a>
        .
      </p>
    </AutoForm>
    </CardContent>
        </Card>
      </div>
  );
}