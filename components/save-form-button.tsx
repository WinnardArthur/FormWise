import React, { useTransition } from "react";
import { HiSave } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import useDesigner from "@/hooks/use-designer";

import { toast } from "./ui/use-toast";
import { FaSpinner } from "react-icons/fa";
import { updateFormContent } from "@/actions/form";

const SaveFormButton = ({ id }: { id: number }) => {
  const [isLoading, startTransition] = useTransition();

  const { elements } = useDesigner();

  const handleUpdateFormContent = async () => {
    console.log({ elements });
    try {
      const jsonElement = JSON.stringify(elements);
      await updateFormContent(id, jsonElement);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleClick = () => {
    startTransition(handleUpdateFormContent);
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={isLoading}
      onClick={handleClick}
    >
      <HiSave className="h-4 w-4" /> Save{" "}
      {isLoading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export { SaveFormButton };
