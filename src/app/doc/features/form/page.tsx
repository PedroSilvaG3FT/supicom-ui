"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DocOutput from "../../_components/doc-output";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_core/components/fragments/button";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import AppFormSelect from "@/_shared/components/form/form-select";
import AppFormSwitch from "@/_shared/components/form/form-switch";
import { Separator } from "@/_core/components/fragments/separator";
import AppFormCheckbox from "@/_shared/components/form/form-checkbox";
import AppFormTextarea from "@/_shared/components/form/form-textarea";
import AppFormRadioGroup from "@/_shared/components/form/form-radio-group";
import { IFormOption } from "@/_shared/components/_interfaces/form-option.interface";

const formSchema = z.object({
  input: z.string().min(1, "Required field"),
  select: z.string().min(1, "Required field"),
  textarea: z.string().min(1, "Required field"),
  radio: z.string().min(1, "Required field"),
  switch: z.boolean(),
  checkbox: z.boolean(),
});

interface IFormData extends z.infer<typeof formSchema> {}

export default function FormPage() {
  const [formValue, setFormValue] = useState<IFormData>({} as IFormData);

  const options: IFormOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      radio: "",
      select: "",
      textarea: "",
      switch: false,
      checkbox: false,
    },
  });

  function onSubmit(values: IFormData) {
    setFormValue(values);
  }

  return (
    <section>
      <h1 className="page-title">Form</h1>
      <Separator className="my-4" />

      <FormContainer {...form}>
        <form
          className="grid gap-5 grid-cols-2 tablet:grid-cols-1 mobile:!grid-cols-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <section className="space-y-4">
            <AppFormInput
              name="input"
              label="Input"
              control={form.control}
              placeholder="Input example..."
            />

            <AppFormSelect
              name="select"
              label="Select"
              options={options}
              control={form.control}
              placeholder="Select example..."
            />

            <AppFormTextarea
              name="textarea"
              label="Textarea"
              control={form.control}
              placeholder="Textarea example..."
            />

            <article className="grid grid-cols-2 gap-4">
              <AppFormRadioGroup
                name="radio"
                options={options}
                label="Radio Group"
                control={form.control}
              />

              <section className="space-y-4 pt-2">
                <AppFormCheckbox
                  name="checkbox"
                  label="Checkbox"
                  control={form.control}
                />

                <AppFormSwitch
                  name="switch"
                  label="Switch"
                  control={form.control}
                />
              </section>
            </article>
          </section>

          <section className="flex gap-4 flex-col items-end">
            <DocOutput
              className="mobile:order-2"
              content={JSON.stringify(formValue)}
            />
            <Button className="mobile:w-full mobile:order-1">Submit</Button>
          </section>
        </form>
      </FormContainer>
    </section>
  );
}
