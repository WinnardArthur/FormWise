"use client";


import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./textarea-field-components/properties-component";
import { DesignerComponent } from "./textarea-field-components/designer-component";
import { FormComponent } from "./textarea-field-components/form-component";
import { BsTextareaResize } from "react-icons/bs";

const type: ElementsType = "TextareaField";

const extraAttributes = {
  label: "Textarea",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
  rows: 3,
};

export const TextareaFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: BsTextareaResize,
    label: "Textarea field",
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
