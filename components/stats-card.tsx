import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatsCard extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value?: string;
  icon: React.ReactNode;
  helperText: string;
  loading: boolean;
}

export const StatsCard = ({
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
