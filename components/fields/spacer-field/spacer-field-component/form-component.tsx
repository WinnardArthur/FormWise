import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../spacer-field";

export const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  const { height } = element.extraAttributes;

  return <div style={{ height, width: "100%" }} />;
};
