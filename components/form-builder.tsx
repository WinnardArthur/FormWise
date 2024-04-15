"use client";

import React from "react";
import { Form } from "@prisma/client";

import { PreviewDialogButton } from "./preview-dialog-button";
import { SaveFormButton } from "./save-form-button";
import { PublishFormButton } from "./publish-form-button";
import Designer from "./designer";
import { DndContext } from "@dnd-kit/core";

interface FormBuilderProps {
  form: Form;
}

const FormBuilder = ({ form }: FormBuilderProps) => {
  return (
    <DndContext>
      <div className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[500px] bg-accent bg-[url(/paper-background.svg)] dark:bg-[url(/paper-background-dark.svg)]">
          <Designer />
        </div>
      </div>
    </DndContext>
  );
};

export default FormBuilder;
