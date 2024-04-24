import React from "react";
import { TextFieldFormElement } from "./fields/text-field/text-field";
import { TitleFieldFormElement } from "./fields/title-field/title-field";
import { SubTitleFieldFormElement } from "./fields/sub-title-field/sub-title-field";
import { ParagraphFieldFormElement } from "./fields/paragraph-field/paragraph-field";
import { SeparatorFieldFormElement } from "./fields/separator-field/separator-field";

export type SubmitFunctionType = (key: string, value: string) => void;

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField";

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
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunctionType;
    isInValid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
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
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
};
