"use client";

import { RiSeparator } from "react-icons/ri";

import { ElementsType, FormElements } from "@/components/form-elements";
import { PropertiesComponent } from "./separator-field-components/properties-component";
import { DesignerComponent } from "./separator-field-components/designer-component";
import { FormComponent } from "./separator-field-components/form-component";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElements = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButtonElement: {
    icon: RiSeparator,
    label: "Separator field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};
