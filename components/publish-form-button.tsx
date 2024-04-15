import React from "react";
import { Button } from "@/components/ui/button";
import { MdOutlinePublish } from "react-icons/md";

const PublishFormButton = () => {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
      <MdOutlinePublish className="h-4 w-4" />
      Publish
    </Button>
  );
};

export { PublishFormButton };
