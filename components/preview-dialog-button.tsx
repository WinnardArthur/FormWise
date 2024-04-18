import React from "react";
import { MdPreview } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./form-elements";
import useDesigner from "@/hooks/use-designer";

const PreviewDialogButton = () => {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant={"outline"}>
          <MdPreview className="h-6 w-6" /> Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="bg-accent flex flex-col items-center justify-center flex-grow p-4 bg-[url('/paper-background.svg')] dark:bg-[url('/paper-background-dark.svg')] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-3xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent elementInstance={element} key={element.id} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { PreviewDialogButton };
