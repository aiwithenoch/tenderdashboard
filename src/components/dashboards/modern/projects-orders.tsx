import { BriefcaseBusiness, ArrowDownUp } from "lucide-react";
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DashboardCard } from "../../shared/dashboard-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SimpleBar from "simplebar-react";
import { Button } from "@/components/ui/button";
import avatar1 from "@/assets/images/profile/user-1.png";
import avatar2 from "@/assets/images/profile/user-2.png";
import avatar3 from "@/assets/images/profile/user-3.png";
import avatar4 from "@/assets/images/profile/user-4.png";
import avatar6 from "@/assets/images/profile/user-6.png";
import avatar7 from "@/assets/images/profile/user-7.png";
import {
  useTenderWorkspace,
  type Tender,
  type TenderStage,
} from "@/context/tender/TenderWorkspaceContext";

const statusConfig: Record<TenderStage, { label: string; bg: string; text: string }> = {
  discovered: { label: "Discovered", bg: "bg-primary/10", text: "text-primary" },
  application: { label: "Preparing", bg: "bg-[#f54900]/10", text: "text-[#f54900]" },
  approval: { label: "Approval", bg: "bg-[#ec003f]/10", text: "text-[#ec003f]" },
  approved: { label: "Ready", bg: "bg-chart-2/10", text: "text-chart-2" },
  submitted: { label: "Submitted", bg: "bg-[#009689]/10", text: "text-[#009689]" },
  won: { label: "Won", bg: "bg-emerald-600/10", text: "text-emerald-600" },
  declined: { label: "Declined", bg: "bg-destructive/10", text: "text-destructive" },
};

const avatars = [avatar2, avatar3, avatar7, avatar6, avatar4, avatar1];

export default function ProjectsOrders() {
  const {
    tenders,
    addToApplications,
    prepareApplication,
    approveTender,
    submitTender,
    markWon,
  } = useTenderWorkspace();

  const handleAction = (tender: Tender) => {
    switch (tender.stage) {
      case "discovered":
        addToApplications(tender.id);
        break;
      case "application":
        prepareApplication(tender.id);
        break;
      case "approval":
        approveTender(tender.id);
        break;
      case "approved":
        submitTender(tender.id);
        break;
      case "submitted":
        markWon(tender.id);
        break;
      case "won":
      case "declined":
        break;
    }
  };

  const actionLabel = (stage: TenderStage) => {
    switch (stage) {
      case "discovered":
        return "Add";
      case "application":
        return "Prepare";
      case "approval":
        return "Approve";
      case "approved":
        return "Submit";
      case "submitted":
        return "Record award";
      case "won":
        return "Awarded";
      case "declined":
        return "Declined";
    }
  };

  return (
    <DashboardCard className="flex flex-col gap-0!">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <BriefcaseBusiness size={16} className="text-foreground" />
          <span>Active Tender Pipeline</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0!">
        <SimpleBar>
          <div className="overflow-x-auto">
            <div className="min-w-[920px]">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="pl-4! px-4 py-3 h-auto text-sm font-normal text-muted-foreground w-[220px]">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        Tender
                        <ArrowDownUp size={14} className="text-muted-foreground shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="px-4 py-3 h-auto text-sm font-normal text-muted-foreground">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        Owner
                        <ArrowDownUp size={14} className="text-muted-foreground shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="px-4 py-3 h-auto text-sm font-normal text-muted-foreground w-[130px]">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        Status
                        <ArrowDownUp size={14} className="text-muted-foreground shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="px-4 py-3 h-auto text-sm font-normal text-muted-foreground w-[120px]">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        Value
                        <ArrowDownUp size={14} className="text-muted-foreground shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="px-4 py-3 h-auto text-sm font-normal text-muted-foreground w-[145px]">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        Deadline
                        <ArrowDownUp size={14} className="text-muted-foreground shrink-0" />
                      </div>
                    </TableHead>
                    <TableHead className="pr-4! px-2 py-3 h-auto w-[120px] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {tenders.map((tender, index) => {
                    const status = statusConfig[tender.stage];
                    const isComplete = tender.stage === "won" || tender.stage === "declined";
                    return (
                      <TableRow key={tender.id} className="border-border hover:bg-muted/30">
                        <TableCell className="pl-4! px-4 py-3 w-[220px]">
                          <div className="flex flex-col leading-5">
                            <span className="text-sm font-medium text-foreground whitespace-nowrap">{tender.id}</span>
                            <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.title}</span>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={avatars[index % avatars.length]}
                              alt={tender.owner}
                              width={30}
                              height={30}
                              className="rounded-full object-cover shrink-0"
                            />
                            <div className="flex flex-col leading-5">
                              <span className="text-sm font-medium text-foreground whitespace-nowrap">{tender.owner}</span>
                              <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.buyer}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 w-[130px]">
                          <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-normal whitespace-nowrap ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3 w-[120px]">
                          <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.value}</span>
                        </TableCell>

                        <TableCell className="px-4 py-3 w-[145px]">
                          <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.deadline}</span>
                        </TableCell>

                        <TableCell className="pr-4! px-2 py-3 w-[120px] text-right">
                          {isComplete ? (
                            <span className={`text-sm font-medium ${status.text}`}>{actionLabel(tender.stage)}</span>
                          ) : (
                            <Button
                              variant="outline"
                              className="h-auto px-3 py-1.5 rounded-md cursor-pointer"
                              onClick={() => handleAction(tender)}
                            >
                              {actionLabel(tender.stage)}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </SimpleBar>
      </CardContent>
    </DashboardCard>
  );
}
