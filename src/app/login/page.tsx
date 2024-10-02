"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const _authContext = useAuth();

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: IFormData) {
    _authContext
      .signIn(values.email, values.password)
      .then(() => router.push("admin/cotacao"))
      .catch(() => ToastUtil.error("Sign in error"));
  }

  return (
    <section className="app-container h-dvh w-full flex items-center justify-center">
      <FormContainer {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-lg"
        >
          <Image
            width={120}
            height={120}
            alt="Supicom"
            src="/images/logo.svg"
          />

          <AppFormInput
            name="email"
            type="email"
            label="e-mail"
            control={form.control}
            placeholder="Insira o seu e-mail"
          />

          <AppFormInput
            label="Senha"
            name="password"
            type="password"
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
