import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../title-field";

export const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  const { title } = element.extraAttributes;

  return <p className="text-xl">{title}</p>;
};
