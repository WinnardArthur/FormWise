import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../textarea-field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  const { label, placeholder, required, helperText, rows } =
    element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Textarea readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
};
