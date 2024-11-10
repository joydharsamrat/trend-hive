/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  children: ReactNode;
  defaultValues?: any;
  onsubmit: SubmitHandler<FieldValues>;
  resolver?: any;
};

const THForm = ({
  children,
  defaultValues,
  onsubmit,
  resolver,
}: TFormProps) => {
  const formConfig: Record<string, unknown> = {
    defaultValues,
    resolver,
  };
  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit;

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={submitHandler(onsubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default THForm;
