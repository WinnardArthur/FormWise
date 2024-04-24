import React from "react";

import {
  FormElementInstance,
  SubmitFunctionType,
} from "@/components/form-elements";
import { CustomInstance } from "../sub-title-field";

export const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunctionType;
  isInvalid?: boolean;
  defaultValue?: string;
}) => {
  const element = elementInstance as CustomInstance;

  const { title } = element.extraAttributes;

  return <p className="text-lg">{title}</p>;
};
