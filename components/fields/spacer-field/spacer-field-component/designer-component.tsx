import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../spacer-field";
import { Label } from "@/components/ui/label";
import { LuSeparatorHorizontal } from "react-icons/lu";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  const { height } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer Field: {height}px</Label>
      <LuSeparatorHorizontal className="w-8 h-8"/>
    </div>
  );
};
