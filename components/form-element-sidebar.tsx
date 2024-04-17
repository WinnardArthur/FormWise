import React from "react";
import SidebarButtonElement from "./sidebar-button-element";
import { FormElements } from "./form-elements";

export const FormElementSidebar = () => {
  return (
    <div>
        Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
};
