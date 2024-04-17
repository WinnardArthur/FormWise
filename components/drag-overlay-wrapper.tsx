import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { SidebarButtonElementDragOverlay } from "./sidebar-button-element";
import { ElementsType, FormElements } from "./form-elements";
import useDesigner from "@/hooks/use-designer";

const DragOverlayWrapper = () => {
  const [draggedItem, setDragItem] = useState<Active | null>(null);

  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => {
      setDragItem(event.active);
    },
    onDragCancel: () => {
      setDragItem(null);
    },
    onDragEnd: () => {
      setDragItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  // If element to drag is a sidebar button element
  const isSidebarButtonElement =
    draggedItem.data?.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;

    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  // If element to drag is a designer element
  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);

    if (!element) node = <div>Element not found</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
