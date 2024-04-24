"use client";

import { Bs123 } from "react-icons/bs";

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./number-field-component/properties-component";
import { DesignerComponent } from "./number-field-component/designer-component";
import { FormComponent } from "./number-field-component/form-component";

const type: ElementsType = "NumberField";

const extraAttributes = {
  label: "Number field",
  helperText: "Helper text",
  required: false,
  placeholder: "0",
};

export const NumberFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Bs123,
    label: "Number field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;

    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};

// Custom Instance Type
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
