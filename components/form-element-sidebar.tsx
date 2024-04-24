import React from "react";
import SidebarButtonElement from "./sidebar-button-element";
import { FormElements } from "./form-elements";
import { Separator } from "./ui/separator";

export const FormElementSidebar = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag & Drop Elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>
        <SidebarButtonElement formElement={FormElements.TitleField} />
        <SidebarButtonElement formElement={FormElements.SubTitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Form elements
        </p>
        <SidebarButtonElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
};
