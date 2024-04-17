"use client";

import React, { useState } from "react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";

import { DesignerSidebar } from "./designer-sidebar";
import { cn, idGenerator } from "@/lib/utils";
import useDesigner from "@/hooks/use-designer";
import { ElementsType, FormElements } from "./form-elements";
import DesignerElementWrapper from "./designer-element-wrapper";

const Designer = () => {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerButtonElement;

      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const isDroppingSidebarButtonOverDesignerDropArea =
        isDesignerButtonElement && isDroppingOverDesignerDropArea;

      // Case 1: Dropping over a designer drop area
      if (isDroppingSidebarButtonOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        // Add element end of elements array
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const isDroppingSidebarButtonOverDesignerElement =
        isDesignerButtonElement && isDroppingOverDesignerElement;

      // Case 2: Dragging a sidebar button and dropping over
      // a designer element eg: Another TextField
      if (isDroppingSidebarButtonOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overElementIndex = elements.findIndex(
          (element) => element.id === over.data?.current?.elementId
        );

        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }

        let newElementIndex = overElementIndex; // If element is dropped on top half

        if (isDroppingOverDesignerElementBottomHalf) {
          newElementIndex = overElementIndex + 1;
        }

        addElement(newElementIndex, newElement);
        return;
      }

      // Case 3: Dragging a designer element over another designer element. eg: TextField over another TextField
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const isDraggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (isDraggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (element) => element.id === activeId
        );
        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let newElementIndex = overElementIndex; // If element is dropped on top half

        if (isDroppingOverDesignerElementBottomHalf) {
          newElementIndex = overElementIndex + 1;
        }

        addElement(newElementIndex, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/50 transition-all"
          )}
        >
          {droppable.isOver && elements.length === 0 ? (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          ) : (
            elements.length === 0 && (
              <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                Drop here
              </p>
            )
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
