import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../paragraph-field";
import { Label } from "@/components/ui/label";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Paragraph field</Label>
      <p className="text-xl">{text}</p>
    </div>
  );
};
