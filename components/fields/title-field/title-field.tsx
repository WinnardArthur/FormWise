"use client";

import { LuHeading1 } from "react-icons/lu";

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./title-field-components/properties-component";
import { DesignerComponent } from "./title-field-components/designer-component";
import { FormComponent } from "./title-field-components/form-component";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Title field",
};

export const TitleFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: LuHeading1,
    label: "Title field",
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
