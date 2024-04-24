"use client";

import { LuHeading2 } from "react-icons/lu";

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./sub-title-field-components/properties-component";
import { DesignerComponent } from "./sub-title-field-components/designer-component";
import { FormComponent } from "./sub-title-field-components/form-component";

const type: ElementsType = "SubTitleField";

const extraAttributes = {
  title: "Subtitle field",
};

export const SubTitleFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: LuHeading2,
    label: "Subtitle field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

// Custom Instance Type
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
