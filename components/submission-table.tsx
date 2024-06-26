import { getFormWithSubmissions } from "@/actions/form";
import React from "react";
import { ElementsType, FormElementInstance } from "./form-elements";
import { format, formatDistance } from "date-fns";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type ColumnsType = {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
};

type RowsType = {
  [key: string]: string;
} & {
  submittedAt: Date;
};

const SubmissionTable = async ({ id }: { id: number }) => {
  const form = await getFormWithSubmissions(id);

  if (!form) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  // Define columns
  const columns: ColumnsType[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextareaField":
      case "SelectField":
      case "CheckboxField":
      case "DateField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  // Define rows
  const rows: RowsType[] = [];
  form.formSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content);

    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubmissionTable;

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: React.ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant="outline">{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <TableCell>{node}</TableCell>;
}
