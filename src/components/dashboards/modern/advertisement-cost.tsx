import { CardContent } from "@/components/ui/card";
import { DashboardCard } from "../../shared/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useTenderWorkspace } from "@/context/tender/TenderWorkspaceContext";

export default function AdvertisementCost() {
  const { stats } = useTenderWorkspace();

  return (
    <DashboardCard className="py-6">
      <CardContent className="flex justify-between flex-row px-6">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-foreground">Submitted Bids</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">{stats.submitted}</h3>
                <Badge className="bg-chart-2/10! text-chart-2!">{stats.won} won</Badge>
              </div>
            </div>
            <div className="border border-border p-2.5 w-fit rounded-md">
              <Send size={16} />
            </div>
          </div>
          <Link to="/submissions">
            <Button variant="outline" className="flex gap-1.5 px-4 py-2 h-auto rounded-md cursor-pointer">
              Track Submissions
              <ArrowRight width={18} height={18} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
