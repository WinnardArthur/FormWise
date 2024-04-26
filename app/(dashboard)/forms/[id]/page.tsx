import React from "react";

import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/form-builder";
import VisitButton from "@/components/visit-button";
import { FormLinkShare } from "@/components/form-link-share";
import { StatsCards } from "@/components/stats-cards";
import SubmissionTable from "@/components/submission-table";

const FormDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const form = await getFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bouncedRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-t border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="container">
        <StatsCards
          data={{
            visits,
            submissions,
            submissionRate,
            bouncedRate,
          }}
        />
      </div>

      <div className="container py-10">
        <SubmissionTable id={form.id} />
      </div>
    </>
  );
};

export default FormDetailPage;
