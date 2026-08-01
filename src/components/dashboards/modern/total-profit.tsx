import { CardContent } from "@/components/ui/card";
import { DashboardCard } from "../../shared/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useTenderWorkspace } from "@/context/tender/TenderWorkspaceContext";

export default function TotalProfit() {
  const { stats } = useTenderWorkspace();

  return (
    <DashboardCard className="py-6">
      <CardContent className="flex justify-between flex-row px-6">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-foreground">Waiting Approval</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">{stats.approvals}</h3>
                <Badge variant="destructive">{stats.readyToSubmit} approved</Badge>
              </div>
            </div>
            <div className="border border-border p-2.5 w-fit rounded-md">
              <UserCheck size={16} />
            </div>
          </div>
          <Link to="/approvals">
            <Button variant="outline" className="flex gap-1.5 px-4 py-2 h-auto rounded-md cursor-pointer">
              Review Approvals
              <ArrowRight width={18} height={18} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
