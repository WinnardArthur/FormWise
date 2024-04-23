import React, { Suspense } from "react";

import { GetFormStats } from "@/actions/form";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/create-form-button";
import { FormCards } from "@/components/form-cards";
import { FormCardSkeleton } from "@/components/form-card-skeleton";
import { StatsCards } from "@/components/stats-cards";

export default async function Home() {
  const stats = await GetFormStats();

  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsCards data={stats} />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />

        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
