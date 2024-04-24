import React from "react";

import { FormElementInstance } from "@/components/form-elements";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
};
