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
import Link from "next/link";
import Confetti from "react-confetti";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

import useDesigner from "@/hooks/use-designer";
import { PreviewDialogButton } from "@/components/preview-dialog-button";
import { SaveFormButton } from "@/components/save-form-button";
import { PublishFormButton } from "@/components/publish-form-button";
import Designer from "@/components/designer";
import DragOverlayWrapper from "@/components/drag-overlay-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface FormBuilderProps {
  form: Form;
}

const FormBuilder = ({ form }: FormBuilderProps) => {
  const { setElements, setSelectedElement } = useDesigner();

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
    setSelectedElement(null);
    setIsReady(true);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  // Copy to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Copied",
      description: "Link copied to clipboard",
    });
  };
  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={600}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-[32rem]">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎉🎊 Form Published 🎉🎊
            </h1>
            <h2 className="text-2xl text-center">Share this form</h2>
            <h3 className="text-xl text-center text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form.
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button className="mt-2 w-full" onClick={handleCopyToClipboard}>
                Copy link
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href="/" className="gap-2">
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
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
                <PublishFormButton id={form.id} />
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
