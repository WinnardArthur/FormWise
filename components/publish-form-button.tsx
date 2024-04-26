import React, { FormEvent, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MdOutlinePublish } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { publishFormButton } from "@/actions/form";

const PublishFormButton = ({ id }: { id: number }) => {
  const [isLoading, startTransition] = useTransition();

  const router = useRouter();

  const handlePublishForm = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await publishFormButton(id);
        toast({
          title: "Success",
          description: "Your form is now available to the public",
        });
      } catch (error) {
        toast({ title: "Error", description: "Something went wrong" });
      } finally {
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing, you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form, you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handlePublishForm}>
            Procced {isLoading && <FaSpinner className="animate-spin ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { PublishFormButton };
