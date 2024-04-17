import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../text-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  const { label, placeholder, required, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
};
