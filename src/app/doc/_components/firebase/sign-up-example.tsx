"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { useAuth } from "@/_core/contexts/auth.context";
import { Button } from "@/_core/components/fragments/button";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import { Timestamp } from "firebase/firestore";

const formSchema = z.object({
  name: z.string().min(1, "Required field"),
  email: z.string().min(1, "Required field"),
  password: z.string().min(1, "Required field"),
});

interface IFormData extends z.infer<typeof formSchema> {}

export default function SignUpExample() {
  const _authContext = useAuth();

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  function onSubmit(values: IFormData) {
    console.log(values);
    _authContext
      .signUp({
        uid: "",
        name: values.name,
        email: values.email,
        password: values.password,
        creationDate: Timestamp.now(),
      })
      .then(() => ToastUtil.success("Sign up successful"))
      .catch(() => ToastUtil.error("Sign up error"));
  }

  return (
    <section>
      <FormContainer {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AppFormInput name="name" label="Name" control={form.control} />

          <AppFormInput
            name="email"
            type="email"
            label="Email"
            control={form.control}
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
