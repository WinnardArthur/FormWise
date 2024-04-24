"use client";

import { BsFillCalendarDateFill } from "react-icons/bs";

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./date-field-components/properties-component";
import { DesignerComponent } from "./date-field-components/designer-component";
import { FormComponent } from "./date-field-components/form-component";

const type: ElementsType = "DateField";

const extraAttributes = {
  label: "Date field",
  helperText: "Pick a date",
  required: false,
};

export const DateFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: BsFillCalendarDateFill,
    label: "Date field",
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
