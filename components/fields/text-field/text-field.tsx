"use client";

import { MdTextFields } from "react-icons/md";

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./text-field-components/properties-component";
import { DesignerComponent } from "./text-field-components/designer-component";
import { FormComponent } from "./text-field-components/form-component";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
};

export const TextFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: MdTextFields,
    label: "Text field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;

    if(element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  }
};

// Custom Instance Type
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
