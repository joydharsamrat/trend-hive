/* eslint-disable @typescript-eslint/no-explicit-any */
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
  defaultValue?: any;
  onsubmit: SubmitHandler<FieldValues>;
  resolver?: any;
};

const THForm = ({ children, defaultValue, onsubmit, resolver }: TFormProps) => {
  const formConfig: Record<string, unknown> = {};

  if (defaultValue) {
    formConfig["defaultValue"] = defaultValue;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
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
