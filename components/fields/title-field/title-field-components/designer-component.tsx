import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../title-field";
import { Label } from "@/components/ui/label";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  const { title } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Title Field</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
};
