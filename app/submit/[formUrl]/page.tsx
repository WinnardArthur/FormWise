import React from "react";

import { getFormByContentUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/form-elements";
import FormSubmitComponent from "@/components/form-submit-component";

const SubmitPage = async ({ params }: { params: { formUrl: string } }) => {
  const form = await getFormByContentUrl(params.formUrl);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
};

export default SubmitPage;
