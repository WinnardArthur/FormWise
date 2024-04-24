import React from "react";

import {
  FormElementInstance,
  SubmitFunctionType,
} from "@/components/form-elements";
import { CustomInstance } from "../paragraph-field";

export const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunctionType;
  isInvalid?: boolean;
  defaultValue?: string;
}) => {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;

  return <p>{text}</p>;
};
