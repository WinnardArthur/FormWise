import React from "react";
import { HiSave } from "react-icons/hi";

import { Button } from "@/components/ui/button";

const SaveFormButton = () => {
  return (
    <Button variant="outline" className="gap-2">
      <HiSave className="h-4 w-4" /> SaveFormButton
    </Button>
  );
};

export { SaveFormButton };
