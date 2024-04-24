"use client";

import { LuSeparatorHorizontal } from "react-icons/lu";

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "@/components/form-elements";
import { PropertiesComponent } from "./spacer-field-component/properties-component";
import { DesignerComponent } from "./spacer-field-component/designer-component";
import { FormComponent } from "./spacer-field-component/form-component";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20,
};

export const SpacerFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer field",
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
