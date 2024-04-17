import React from "react";
import { TextFieldFormElement } from "./fields/text-field/text-field";

export type ElementsType = "TextField";

export type FormElements = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElements;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
