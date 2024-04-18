"use client";

import React, { useEffect, useState } from "react";
import { ImShare } from "react-icons/im";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast({ title: "Copied", description: "Link copied to clipboard" });
  };
  return (
    <div className="flex justify-between items-center w-full">
      <Input value={shareLink} readOnly className="" />
      <Button
        className="w-[163px] font-semibold text-lg py-5"
        onClick={handleCopyToClipboard}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  );
};
