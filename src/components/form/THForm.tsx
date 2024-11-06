"use client";

import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  children: ReactNode;
  defaultValue?: string;
  onsubmit: SubmitHandler<FieldValues>;
};

const THForm = ({ children, defaultValue, onsubmit }: TFormProps) => {
  const formConfig: Record<string, unknown> = {};

  if (defaultValue) {
    formConfig["defaultValue"] = defaultValue;
  }
  const method = useForm(formConfig);

  const submitHandler = method.handleSubmit;

  return (
    <FormProvider {...method}>
      <form className="space-y-6" onSubmit={submitHandler(onsubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default THForm;
