"use client";

import { BsTextParagraph } from "react-icons/bs";

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./paragraph-field-components/properties-component";
import { DesignerComponent } from "./paragraph-field-components/designer-component";
import { FormComponent } from "./paragraph-field-components/form-component";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
  text: "Text here",
};

export const ParagraphFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: BsTextParagraph,
    label: "Paragraph field",
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
