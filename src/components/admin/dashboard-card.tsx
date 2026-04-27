import { Card, CardContent } from "@/components/ui/card";

type DashboardCardProps = {
  label: string;
  value: number;
};

export function DashboardCard({ label, value }: DashboardCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}
