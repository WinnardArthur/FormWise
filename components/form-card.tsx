import React from "react";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { LuView } from "react-icons/lu";
import { FaWpforms, FaEdit } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

interface FormCardProps {
  form: Form;
}

const FormCard = ({ form }: FormCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="w-full mt-4     text-base gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        ) : (
          <Button variant='secondary' asChild className="w-full mt-4 text-base gap-4">
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
