"use client";

import React, { useEffect, useState } from "react";
import { Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { PreviewDialogButton } from "./preview-dialog-button";
import { SaveFormButton } from "./save-form-button";
import { PublishFormButton } from "./publish-form-button";
import Designer from "./designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import useDesigner from "@/hooks/use-designer";
import { ImSpinner2 } from "react-icons/im";

interface FormBuilderProps {
  form: Form;
}

const FormBuilder = ({ form }: FormBuilderProps) => {
  const { setElements } = useDesigner();

  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;

    const elements = JSON.parse(form.content);
    setElements(elements);
    setIsReady(true);
  }, [form, setElements]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton id={form.id} />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[500px] bg-accent bg-[url(/paper-background.svg)] dark:bg-[url(/paper-background-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
