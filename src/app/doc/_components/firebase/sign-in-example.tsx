"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { useAuth } from "@/_core/contexts/auth.context";
import { Button } from "@/_core/components/fragments/button";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";

const formSchema = z.object({
  email: z.string().min(1, "Required field"),
  password: z.string().min(1, "Required field"),
});

interface IFormData extends z.infer<typeof formSchema> {}

export default function SignInExample() {
  const _authContext = useAuth();

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: IFormData) {
    _authContext
      .signIn(values.email, values.password)
      .then(() => ToastUtil.success("Sign in successful"))
      .catch(() => ToastUtil.error("Sign in error"));
  }

  return (
    <section>
      <FormContainer {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AppFormInput
            name="email"
            type="email"
            label="Email"
            control={form.control}
            placeholder="Insira o seu e-mail"
          />

          <AppFormInput
            name="password"
            type="password"
            label="Password"
            control={form.control}
            placeholder="**********"
          />

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </FormContainer>
    </section>
  );
}
