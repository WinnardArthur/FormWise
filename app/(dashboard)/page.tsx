import React, { Suspense } from "react";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";

import { GetFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/create-form-button";
import { FormCards } from "@/components/form-cards";
import { FormCardSkeleton } from "@/components/form-card-skeleton";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatWrapper />
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

async function CardStatWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards({ data, loading }: StatsCardsProps) {
  return (
    <div className="w-full pt-8 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Visits that results in form submission"
        value={data?.visits.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leave without interactions"
        value={data?.visits.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

interface StatsCard extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value?: string;
  icon: React.ReactNode;
  helperText: string;
  loading: boolean;
}

const StatsCard = ({
  title,
  value,
  icon,
  helperText,
  loading,
  ...props
}: StatsCard) => {
  return (
    <Card className={cn(props.className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
};
