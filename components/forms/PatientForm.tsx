"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Button } from "../ui/button";

export const PatientForm = ({
  valid = "register",
}: {
  valid: "user" | "register";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signIn, setSignIn] = useState(valid === "user");

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6">
        {!signIn ? (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header text-gray-100">Hi there 👋</h1>
              <p className="text-dark-700">Get started with appointments.</p>
            </section>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Full name"
              placeholder="John Doe"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />
          </>
        ) : (
          <section className="mb-12 space-y-4">
            <h1 className="header text-gray-100">Welcome back! 👋</h1>
            <p className="text-dark-700">View and Book appointments.</p>
          </section>
        )}

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>
          {signIn ? "Sign In" : "Register"}
        </SubmitButton>
        <p className="text-gray-100">
          {signIn ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="link"
            className="text-green-500"
            onClick={() => setSignIn(!signIn)}>
            {signIn ? "Register" : "Sign In"}
          </Button>
        </p>
      </form>
    </Form>
  );
};
