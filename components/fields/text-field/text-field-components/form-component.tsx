import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../text-field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const FormComponent = ({
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
      <Input placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
};