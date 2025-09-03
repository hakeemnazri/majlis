import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Target } from "lucide-react";
import React from "react";

type DrawerContentDonationTargetProps = {
  current: number | null;
  target: number | null;
};

function DrawerContentDonationTarget({
  current,
  target,
}: DrawerContentDonationTargetProps) {
  if (current === null || target === null) return null;

  const progressPercentage = (current / target) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          Funding Progress
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              Raised: {formatCurrency(current)}
            </span>
            <span className="text-muted-foreground">
              Goal: {formatCurrency(target)}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-xs text-muted-foreground">
            {Math.round(progressPercentage)}% completed{" "}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DrawerContentDonationTarget;
