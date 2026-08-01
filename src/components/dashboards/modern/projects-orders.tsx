import { BriefcaseBusiness, ArrowDownUp, Ellipsis } from "lucide-react";
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


type StatusKey = "Preparing" | "Approval" | "Submitted" | "Won";

const statusConfig: Record<StatusKey, { bg: string; text: string }> = {
  Preparing: { bg: "bg-[#f54900]/10", text: "text-[#f54900]" },
  Approval: { bg: "bg-[#ec003f]/10", text: "text-[#ec003f]" },
  Submitted: { bg: "bg-[#009689]/10", text: "text-[#009689]" },
  Won: { bg: "bg-chart-2/10", text: "text-chart-2" },
};

const tenders: {
  id: string;
  tender: string;
  avatar: string;
  buyer: string;
  market: string;
  status: StatusKey;
  value: string;
  deadline: string;
}[] = [
  {
    id: "GH-2026-0841",
    tender: "Protective clothing and PPE",
    avatar: avatar2,
    buyer: "Tema Metropolitan Assembly",
    market: "Ghana · PPE & Safety",
    status: "Approval",
    value: "GHS 2.4M",
    deadline: "Aug 12, 2026",
  },
  {
    id: "SA-2026-2197",
    tender: "Industrial cleaning services",
    avatar: avatar3,
    buyer: "Gauteng Infrastructure",
    market: "South Africa · Facilities",
    status: "Preparing",
    value: "R 8.6M",
    deadline: "Aug 17, 2026",
  },
  {
    id: "KE-2026-1304",
    tender: "Security guarding services",
    avatar: avatar7,
    buyer: "Kenya Medical Supplies Authority",
    market: "Kenya · Security",
    status: "Preparing",
    value: "KES 34M",
    deadline: "Aug 22, 2026",
  },
  {
    id: "UG-2026-6612",
    tender: "Safety boots and workwear",
    avatar: avatar6,
    buyer: "Uganda National Roads Authority",
    market: "Uganda · PPE & Safety",
    status: "Submitted",
    value: "UGX 740M",
    deadline: "Aug 8, 2026",
  },
  {
    id: "TZ-2026-4420",
    tender: "Fire and emergency equipment",
    avatar: avatar4,
    buyer: "Tanzania Ports Authority",
    market: "Tanzania · Fire & Safety",
    status: "Approval",
    value: "TZS 1.1B",
    deadline: "Aug 9, 2026",
  },
  {
    id: "GH-2026-0178",
    tender: "Facilities maintenance contract",
    avatar: avatar1,
    buyer: "Ghana Health Service",
    market: "Ghana · Facilities",
    status: "Won",
    value: "GHS 1.6M",
    deadline: "Jul 18, 2026",
  },
];

export default function ProjectsOrders() {
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
                        Buyer
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
                    <TableHead className="pr-4! px-2 py-3 h-auto w-[48px]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {tenders.map((tender) => {
                    const { bg, text } = statusConfig[tender.status];
                    return (
                      <TableRow key={tender.id} className="border-border hover:bg-muted/30">
                        <TableCell className="pl-4! px-4 py-3 w-[220px]">
                          <div className="flex flex-col leading-5">
                            <span className="text-sm font-medium text-foreground whitespace-nowrap">{tender.id}</span>
                            <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.tender}</span>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={tender.avatar}
                              alt={tender.buyer}
                              width={30}
                              height={30}
                              className="rounded-full object-cover shrink-0"
                            />
                            <div className="flex flex-col leading-5">
                              <span className="text-sm font-medium text-foreground whitespace-nowrap">{tender.buyer}</span>
                              <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.market}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 w-[130px]">
                          <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-normal whitespace-nowrap ${bg} ${text}`}>
                            {tender.status}
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3 w-[120px]">
                          <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.value}</span>
                        </TableCell>

                        <TableCell className="px-4 py-3 w-[145px]">
                          <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{tender.deadline}</span>
                        </TableCell>

                        <TableCell className="pr-4! px-2 py-3 w-[48px]">
                          <Button
                            variant="ghost"
                            className="p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                            aria-label={`Open ${tender.id}`}
                          >
                            <Ellipsis size={16} className="text-foreground" />
                          </Button>
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
