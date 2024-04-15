import React from "react";

import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/form-builder";

const BuilderPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const form = await getFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="w-full">
      <FormBuilder form={form} />
    </div>
  );
};

export default BuilderPage;
