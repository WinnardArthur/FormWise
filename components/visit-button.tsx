"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const VisitButton = ({ shareUrl }: { shareUrl: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button onClick={() => window.open(shareLink, "_blank")} className="w-[150px] font-semibold text-lg py-5">Visit</Button>
  );
};

export default VisitButton;
