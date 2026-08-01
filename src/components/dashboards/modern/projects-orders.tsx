import { useMemo, useState } from 'react';
import { BriefcaseBusiness, ArrowDownUp } from 'lucide-react';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { DashboardCard } from '../../shared/dashboard-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SimpleBar from 'simplebar-react';
import { Button } from '@/components/ui/button';
import avatar1 from '@/assets/images/profile/user-1.png';
import avatar2 from '@/assets/images/profile/user-2.png';
import avatar3 from '@/assets/images/profile/user-3.png';
import avatar4 from '@/assets/images/profile/user-4.png';
import avatar6 from '@/assets/images/profile/user-6.png';
import avatar7 from '@/assets/images/profile/user-7.png';
import {
  useTenderWorkspace,
  type Tender,
  type TenderStage,
} from '@/context/tender/TenderWorkspaceContext';

const statusConfig: Record<TenderStage, { label: string; bg: string; text: string }> = {
  discovered: { label: 'Discovered', bg: 'bg-primary/10', text: 'text-primary' },
  application: { label: 'Preparing', bg: 'bg-chart-4/10', text: 'text-chart-4' },
  approval: { label: 'Approval', bg: 'bg-chart-1/10', text: 'text-chart-1' },
  approved: { label: 'Ready', bg: 'bg-chart-2/10', text: 'text-chart-2' },
  submitted: { label: 'Submitted', bg: 'bg-chart-5/10', text: 'text-chart-5' },
  won: { label: 'Won', bg: 'bg-chart-2/10', text: 'text-chart-2' },
  declined: { label: 'Declined', bg: 'bg-destructive/10', text: 'text-destructive' },
};

const avatars = [avatar2, avatar3, avatar7, avatar6, avatar4, avatar1];

function getAvatar(tender: Tender) {
  const index = Array.from(tender.id).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );

  return avatars[index % avatars.length];
}

type SortKey = 'tender' | 'owner' | 'status' | 'value' | 'deadline';
type SortDirection = 'asc' | 'desc';

function getSortValue(tender: Tender, key: SortKey) {
  switch (key) {
    case 'tender':
      return `${tender.id} ${tender.title}`.toLowerCase();
    case 'owner':
      return `${tender.owner} ${tender.buyer}`.toLowerCase();
    case 'status':
      return statusConfig[tender.stage].label.toLowerCase();
    case 'value':
      return tender.value.toLowerCase();
    case 'deadline':
      return Date.parse(tender.deadline) || 0;
  }
}

export default function ProjectsOrders() {
  const {
    tenders,
    addToApplications,
    prepareApplication,
    approveTender,
    submitTender,
    markWon,
  } = useTenderWorkspace();
  const [sortKey, setSortKey] = useState<SortKey>('deadline');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedTenders = useMemo(() => {
    return [...tenders].sort((first, second) => {
      const firstValue = getSortValue(first, sortKey);
      const secondValue = getSortValue(second, sortKey);
      const result =
        typeof firstValue === 'number' && typeof secondValue === 'number'
          ? firstValue - secondValue
          : String(firstValue).localeCompare(String(secondValue));

      return sortDirection === 'asc' ? result : -result;
    });
  }, [sortDirection, sortKey, tenders]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  const handleAction = (tender: Tender) => {
    switch (tender.stage) {
      case 'discovered':
        addToApplications(tender.id);
        break;
      case 'application':
        prepareApplication(tender.id);
        break;
      case 'approval':
        approveTender(tender.id);
        break;
      case 'approved':
        submitTender(tender.id);
        break;
      case 'submitted':
        markWon(tender.id);
        break;
      case 'won':
      case 'declined':
        break;
    }
  };

  const actionLabel = (stage: TenderStage) => {
    switch (stage) {
      case 'discovered':
        return 'Add';
      case 'application':
        return 'Prepare';
      case 'approval':
        return 'Approve';
      case 'approved':
        return 'Submit';
      case 'submitted':
        return 'Record award';
      case 'won':
        return 'Awarded';
      case 'declined':
        return 'Declined';
    }
  };

  const SortHeader = ({ label, value }: { label: string; value: SortKey }) => (
    <button
      type="button"
      onClick={() => toggleSort(value)}
      className="flex items-center gap-1.5 whitespace-nowrap text-left text-sm font-normal text-muted-foreground hover:text-foreground"
      aria-label={`Sort by ${label}`}
    >
      {label}
      <ArrowDownUp
        size={14}
        className={sortKey === value ? 'shrink-0 text-foreground' : 'shrink-0'}
      />
    </button>
  );

  return (
    <DashboardCard className="flex flex-col gap-0!">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <BriefcaseBusiness size={16} className="shrink-0 text-foreground" />
          <span>Active Tender Pipeline</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0!">
        <SimpleBar>
          <div className="overflow-x-auto">
            <div className="min-w-[1020px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="h-auto w-[280px] px-4 py-3 pl-4!">
                      <SortHeader label="Tender" value="tender" />
                    </TableHead>
                    <TableHead className="h-auto px-4 py-3">
                      <SortHeader label="Owner" value="owner" />
                    </TableHead>
                    <TableHead className="h-auto w-[130px] px-4 py-3">
                      <SortHeader label="Status" value="status" />
                    </TableHead>
                    <TableHead className="h-auto w-[120px] px-4 py-3">
                      <SortHeader label="Value" value="value" />
                    </TableHead>
                    <TableHead className="h-auto w-[145px] px-4 py-3">
                      <SortHeader label="Deadline" value="deadline" />
                    </TableHead>
                    <TableHead className="h-auto w-[130px] px-4 py-3 pr-4! text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedTenders.map((tender) => {
                    const status = statusConfig[tender.stage];
                    const isComplete = tender.stage === 'won' || tender.stage === 'declined';

                    return (
                      <TableRow key={tender.id} className="border-border hover:bg-muted/30">
                        <TableCell className="w-[280px] px-4 py-3 pl-4! align-middle">
                          <div className="flex max-w-[280px] flex-col leading-5">
                            <span className="whitespace-nowrap text-sm font-medium text-foreground">
                              {tender.id}
                            </span>
                            <span className="whitespace-normal text-sm font-normal text-muted-foreground">
                              {tender.title}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 align-middle">
                          <div className="flex min-w-0 items-center gap-3">
                            <img
                              src={getAvatar(tender)}
                              alt={tender.owner}
                              width={30}
                              height={30}
                              className="h-[30px] w-[30px] shrink-0 rounded-full object-cover"
                            />
                            <div className="flex max-w-72 min-w-0 flex-col leading-5">
                              <span className="whitespace-nowrap text-sm font-medium text-foreground">
                                {tender.owner}
                              </span>
                              <span className="whitespace-normal text-sm font-normal text-muted-foreground">
                                {tender.buyer}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="w-[130px] px-4 py-3 align-middle">
                          <span
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-normal ${status.bg} ${status.text}`}
                          >
                            {status.label}
                          </span>
                        </TableCell>

                        <TableCell className="w-[120px] px-4 py-3 align-middle">
                          <span className="whitespace-nowrap text-sm font-normal text-muted-foreground">
                            {tender.value}
                          </span>
                        </TableCell>

                        <TableCell className="w-[145px] px-4 py-3 align-middle">
                          <span className="whitespace-nowrap text-sm font-normal text-muted-foreground">
                            {tender.deadline}
                          </span>
                        </TableCell>

                        <TableCell className="w-[130px] px-4 py-3 pr-4! text-right align-middle">
                          {isComplete ? (
                            <span className={`whitespace-nowrap text-sm font-medium ${status.text}`}>
                              {actionLabel(tender.stage)}
                            </span>
                          ) : (
                            <Button
                              variant="outline"
                              className="h-8 whitespace-nowrap rounded-md px-3"
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
