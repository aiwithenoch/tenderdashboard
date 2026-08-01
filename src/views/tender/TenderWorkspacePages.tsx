import {
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileSearch,
  FileText,
  FolderLock,
  Globe2,
  Radar,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardCard } from '@/components/shared/dashboard-card';
import {
  useTenderWorkspace,
  type CompanyProfile,
  type Tender,
  type TenderStage,
  type WorkspaceSettings,
} from '@/context/tender/TenderWorkspaceContext';

const stageLabels: Record<TenderStage, string> = {
  discovered: 'Discovered',
  application: 'Preparing',
  approval: 'Awaiting approval',
  approved: 'Ready to submit',
  submitted: 'Submitted',
  won: 'Won',
  declined: 'Declined',
};

const stageClasses: Record<TenderStage, string> = {
  discovered: 'bg-primary/10 text-primary',
  application: 'bg-chart-4/10 text-chart-4',
  approval: 'bg-chart-1/10 text-chart-1',
  approved: 'bg-chart-2/10 text-chart-2',
  submitted: 'bg-chart-5/10 text-chart-5',
  won: 'bg-chart-2/10 text-chart-2',
  declined: 'bg-destructive/10 text-destructive',
};

function StageBadge({ stage }: { stage: TenderStage }) {
  return (
    <Badge
      className={`${stageClasses[stage]} inline-flex whitespace-nowrap border-0 font-normal`}
    >
      {stageLabels[stage]}
    </Badge>
  );
}

function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center p-6 text-center sm:p-8">
      <div className="rounded-lg border border-border p-3">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-5 text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-4 w-full sm:w-auto">{action}</div>}
    </div>
  );
}

function getWorkflowHref(stage: TenderStage) {
  if (stage === 'application') return '/applications';
  if (stage === 'approval') return '/approvals';
  if (['approved', 'submitted', 'won'].includes(stage)) return '/submissions';
  return '/analytics';
}

function TenderRows({
  tenders,
  renderAction,
}: {
  tenders: Tender[];
  renderAction: (tender: Tender) => ReactNode;
}) {
  return (
    <TableBody>
      {tenders.map((tender) => (
        <TableRow key={tender.id} className="border-border hover:bg-muted/30">
          <TableCell className="px-4 py-3 align-middle first:pl-4!">
            <div className="flex max-w-80 flex-col leading-5">
              <span className="whitespace-nowrap text-sm font-medium text-foreground">
                {tender.id}
              </span>
              <span className="whitespace-normal text-sm text-muted-foreground">
                {tender.title}
              </span>
            </div>
          </TableCell>

          <TableCell className="px-4 py-3 align-middle">
            <div className="flex max-w-72 flex-col leading-5">
              <span className="whitespace-normal text-sm font-medium text-foreground">
                {tender.buyer}
              </span>
              <span className="whitespace-nowrap text-sm text-muted-foreground">
                {tender.country} · {tender.category}
              </span>
            </div>
          </TableCell>

          <TableCell className="px-4 py-3 align-middle">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-sm font-semibold">{tender.match}%</span>
              <div
                className="h-1.5 w-16 overflow-hidden rounded-full bg-muted"
                aria-label={`${tender.match}% AI match`}
              >
                <div className="h-full bg-primary" style={{ width: `${tender.match}%` }} />
              </div>
            </div>
          </TableCell>

          <TableCell className="px-4 py-3 align-middle">
            <StageBadge stage={tender.stage} />
          </TableCell>

          <TableCell className="whitespace-nowrap px-4 py-3 align-middle text-sm text-muted-foreground">
            {tender.deadline}
          </TableCell>

          <TableCell className="whitespace-nowrap px-4 py-3 align-middle text-sm text-muted-foreground">
            {tender.owner}
          </TableCell>

          <TableCell className="w-44 px-4 py-3 text-right align-middle last:pr-4!">
            {renderAction(tender)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function TenderTable({
  tenders,
  renderAction,
}: {
  tenders: Tender[];
  renderAction: (tender: Tender) => ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1040px]">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="px-4 py-3 first:pl-4!">Tender</TableHead>
              <TableHead className="px-4 py-3">Buyer</TableHead>
              <TableHead className="px-4 py-3">AI match</TableHead>
              <TableHead className="px-4 py-3">Status</TableHead>
              <TableHead className="px-4 py-3">Deadline</TableHead>
              <TableHead className="px-4 py-3">Owner</TableHead>
              <TableHead className="px-4 py-3 text-right last:pr-4!">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TenderRows tenders={tenders} renderAction={renderAction} />
        </Table>
      </div>
    </div>
  );
}

export function TenderDiscoveryPage() {
  const { tenders, runScan, addToApplications } = useTenderWorkspace();
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All');
  const [scanMessage, setScanMessage] = useState('');

  const countries = useMemo(
    () => ['All', ...Array.from(new Set(tenders.map((tender) => tender.country)))],
    [tenders],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return tenders.filter((tender) => {
      const matchesCountry = country === 'All' || tender.country === country;
      const matchesQuery =
        !normalized ||
        `${tender.id} ${tender.title} ${tender.buyer} ${tender.category}`
          .toLowerCase()
          .includes(normalized);

      return matchesCountry && matchesQuery;
    });
  }, [country, query, tenders]);

  const handleScan = () => {
    const tender = runScan();
    setScanMessage(`${tender.id} is available with a ${tender.match}% match score.`);
  };

  return (
    <>
      <PageHeader
        title="Tender Discovery"
        description="Scan, filter and qualify opportunities across African procurement markets."
        action={
          <Button onClick={handleScan} className="h-9 w-full gap-1.5 px-4 sm:w-auto">
            <Radar className="h-4 w-4" />
            Run tender scan
          </Button>
        }
      />

      {scanMessage && (
        <div
          className="mb-4 rounded-lg border border-border bg-card px-4 py-3 text-sm"
          role="status"
          aria-live="polite"
        >
          <span className="font-medium">Live scan complete:</span> {scanMessage}
        </div>
      )}

      <DashboardCard className="flex flex-col gap-0!">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-4 w-4 shrink-0" />
              Opportunity feed
            </CardTitle>

            <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search opportunities"
                  className="h-9 w-full pl-9!"
                />
              </div>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
                aria-label="Filter by country"
              >
                {countries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0!">
          {filtered.length ? (
            <TenderTable
              tenders={filtered}
              renderAction={(tender) =>
                tender.stage === 'discovered' ? (
                  <Button
                    variant="outline"
                    onClick={() => addToApplications(tender.id)}
                    className="h-8 whitespace-nowrap px-3"
                  >
                    Add to applications
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    render={<Link to={getWorkflowHref(tender.stage)} />}
                    className="h-8 whitespace-nowrap px-3 text-primary"
                  >
                    View workflow
                  </Button>
                )
              }
            />
          ) : (
            <EmptyState
              icon={Search}
              title="No opportunities match these filters"
              description="Change the search term or country filter to see more tender opportunities."
              action={
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setQuery('');
                    setCountry('All');
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
        </CardContent>
      </DashboardCard>
    </>
  );
}

export function ApplicationsPage() {
  const { tenders, prepareApplication } = useTenderWorkspace();
  const applications = tenders.filter((tender) => tender.stage === 'application');

  return (
    <>
      <PageHeader
        title="Applications"
        description="Prepare technical responses, compliance packs and pricing schedules."
        action={
          <Button
            variant="outline"
            render={<Link to="/tenders" />}
            className="h-9 w-full gap-1.5 sm:w-auto"
          >
            <FileSearch className="h-4 w-4" />
            Find tenders
          </Button>
        }
      />

      <DashboardCard className="flex flex-col gap-0!">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 shrink-0" />
            Active application workspaces
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0!">
          {applications.length ? (
            <TenderTable
              tenders={applications}
              renderAction={(tender) => (
                <Button
                  onClick={() => prepareApplication(tender.id)}
                  className="h-8 whitespace-nowrap px-3"
                >
                  Prepare with AI
                </Button>
              )}
            />
          ) : (
            <EmptyState
              icon={FileText}
              title="No applications are being prepared"
              description="Move an opportunity from Tender Discovery into applications to start the preparation workflow."
              action={
                <Button
                  render={<Link to="/tenders" />}
                  className="w-full sm:w-auto"
                >
                  Open Tender Discovery
                </Button>
              }
            />
          )}
        </CardContent>
      </DashboardCard>
    </>
  );
}

export function ApprovalsPage() {
  const { tenders, approveTender, declineTender } = useTenderWorkspace();
  const approvals = tenders.filter((tender) => tender.stage === 'approval');

  return (
    <>
      <PageHeader
        title="Approvals"
        description="Human approval is required before any tender is submitted."
      />

      <DashboardCard className="flex flex-col gap-0!">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 shrink-0" />
            Bid packages awaiting management
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0!">
          {approvals.length ? (
            <TenderTable
              tenders={approvals}
              renderAction={(tender) => (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => declineTender(tender.id)}
                    className="h-8 px-3"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={() => approveTender(tender.id)}
                    className="h-8 whitespace-nowrap px-3"
                  >
                    Approve bid
                  </Button>
                </div>
              )}
            />
          ) : (
            <EmptyState
              icon={CheckCircle2}
              title="Approval queue is clear"
              description="Prepared applications will appear here for management review."
              action={
                <Button
                  variant="outline"
                  render={<Link to="/applications" />}
                  className="w-full sm:w-auto"
                >
                  View applications
                </Button>
              }
            />
          )}
        </CardContent>
      </DashboardCard>
    </>
  );
}

export function SubmissionsPage() {
  const { tenders, submitTender, markWon } = useTenderWorkspace();
  const submissions = tenders.filter((tender) =>
    ['approved', 'submitted', 'won'].includes(tender.stage),
  );

  return (
    <>
      <PageHeader
        title="Submitted Bids"
        description="Submit approved bids, save receipts and track award outcomes."
      />

      <DashboardCard className="flex flex-col gap-0!">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <Send className="h-4 w-4 shrink-0" />
            Submission register
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0!">
          {submissions.length ? (
            <TenderTable
              tenders={submissions}
              renderAction={(tender) => {
                if (tender.stage === 'approved') {
                  return (
                    <Button
                      onClick={() => submitTender(tender.id)}
                      className="h-8 whitespace-nowrap px-3"
                    >
                      Submit bid
                    </Button>
                  );
                }

                if (tender.stage === 'submitted') {
                  return (
                    <Button
                      variant="outline"
                      onClick={() => markWon(tender.id)}
                      className="h-8 whitespace-nowrap px-3"
                    >
                      Record award
                    </Button>
                  );
                }

                return (
                  <span className="whitespace-nowrap text-sm font-medium text-chart-2">
                    Contract awarded
                  </span>
                );
              }}
            />
          ) : (
            <EmptyState
              icon={Send}
              title="No bids are ready for submission"
              description="Approved bids will appear here for submission and award tracking."
              action={
                <Button
                  variant="outline"
                  render={<Link to="/approvals" />}
                  className="w-full sm:w-auto"
                >
                  Open approvals
                </Button>
              }
            />
          )}
        </CardContent>
      </DashboardCard>
    </>
  );
}

export function DocumentsPage() {
  const { documents, addDocument, stats } = useTenderWorkspace();
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    addDocument(file.name);
    setUploadMessage(`${file.name} was added to the document vault.`);
    event.target.value = '';
  };

  return (
    <>
      <PageHeader
        title="Document Vault"
        description="Keep reusable company and compliance documents ready for every bid."
        action={
          <label className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80 sm:w-auto">
            <Upload className="h-4 w-4" />
            Upload document
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        }
      />

      {uploadMessage && (
        <div
          className="mb-4 rounded-lg border border-border bg-card px-4 py-3 text-sm"
          role="status"
          aria-live="polite"
        >
          {uploadMessage}
        </div>
      )}

      <div className="mb-4 grid grid-cols-12 gap-4">
        <DashboardCard className="col-span-12 p-5 md:col-span-4">
          <p className="text-sm text-muted-foreground">Valid documents</p>
          <p className="mt-1 text-2xl font-semibold">{stats.validDocuments}</p>
        </DashboardCard>
        <DashboardCard className="col-span-12 p-5 md:col-span-4">
          <p className="text-sm text-muted-foreground">Total records</p>
          <p className="mt-1 text-2xl font-semibold">{stats.totalDocuments}</p>
        </DashboardCard>
        <DashboardCard className="col-span-12 p-5 md:col-span-4">
          <p className="text-sm text-muted-foreground">Needs attention</p>
          <p className="mt-1 text-2xl font-semibold">
            {documents.filter((document) => document.status !== 'Valid').length}
          </p>
        </DashboardCard>
      </div>

      <DashboardCard className="flex flex-col gap-0!">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <FolderLock className="h-4 w-4 shrink-0" />
            Company document register
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0!">
          <div className="overflow-x-auto">
            <div className="min-w-[680px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="px-4 py-3 first:pl-4!">Document</TableHead>
                    <TableHead className="px-4 py-3">Type</TableHead>
                    <TableHead className="px-4 py-3">Status</TableHead>
                    <TableHead className="px-4 py-3 last:pr-4!">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((document) => (
                    <TableRow key={document.id} className="border-border hover:bg-muted/30">
                      <TableCell className="max-w-96 whitespace-normal px-4 py-3 font-medium first:pl-4!">
                        {document.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {document.type}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge
                          className={
                            document.status === 'Valid'
                              ? 'border-0 bg-chart-2/10 text-chart-2'
                              : document.status === 'Expiring'
                                ? 'border-0 bg-chart-4/10 text-chart-4'
                                : 'border-0 bg-destructive/10 text-destructive'
                          }
                        >
                          {document.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 py-3 text-muted-foreground last:pr-4!">
                        {document.updatedAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </DashboardCard>
    </>
  );
}

export function CompanyProfilePage() {
  const { profile, updateProfile } = useTenderWorkspace();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const updateDraft = (key: keyof CompanyProfile, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(draft);
    setSaved(true);
  };

  return (
    <>
      <PageHeader
        title="Company Profile"
        description="This information powers qualification scoring and reusable bid content."
      />

      <form onSubmit={handleSubmit}>
        <DashboardCard className="flex flex-col gap-0!">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex min-w-0 items-center gap-2">
              <Building2 className="h-4 w-4 shrink-0" />
              <span className="truncate">{draft.companyName || 'Company profile'}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-12 gap-4 p-5!">
            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-6">
              <span className="text-sm font-medium">Company name</span>
              <Input
                value={draft.companyName}
                onChange={(event) => updateDraft('companyName', event.target.value)}
              />
            </label>

            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-6">
              <span className="text-sm font-medium">Registration number</span>
              <Input
                value={draft.registrationNumber}
                onChange={(event) => updateDraft('registrationNumber', event.target.value)}
              />
            </label>

            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-6">
              <span className="text-sm font-medium">Country</span>
              <Input
                value={draft.country}
                onChange={(event) => updateDraft('country', event.target.value)}
              />
            </label>

            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-6">
              <span className="text-sm font-medium">Tender manager</span>
              <Input
                value={draft.contactName}
                onChange={(event) => updateDraft('contactName', event.target.value)}
              />
            </label>

            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-6">
              <span className="text-sm font-medium">Email</span>
              <Input
                type="email"
                value={draft.email}
                onChange={(event) => updateDraft('email', event.target.value)}
              />
            </label>

            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-6">
              <span className="text-sm font-medium">Phone</span>
              <Input
                value={draft.phone}
                onChange={(event) => updateDraft('phone', event.target.value)}
              />
            </label>

            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-9">
              <span className="text-sm font-medium">Sectors and capabilities</span>
              <Input
                value={draft.sectors}
                onChange={(event) => updateDraft('sectors', event.target.value)}
              />
            </label>

            <label className="col-span-12 flex flex-col gap-1.5 md:col-span-3">
              <span className="text-sm font-medium">Years of experience</span>
              <Input
                type="number"
                min="0"
                value={draft.yearsExperience}
                onChange={(event) => updateDraft('yearsExperience', event.target.value)}
              />
            </label>

            <div className="col-span-12 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                {saved
                  ? 'Company profile saved in this browser.'
                  : 'Changes are saved locally for the simulation.'}
              </p>
              <Button type="submit" className="w-full sm:w-auto">
                Save profile
              </Button>
            </div>
          </CardContent>
        </DashboardCard>
      </form>
    </>
  );
}

export function AnalyticsPage() {
  const { tenders, stats, activity } = useTenderWorkspace();

  const countries = useMemo(
    () =>
      tenders.reduce<Record<string, number>>((result, tender) => {
        result[tender.country] = (result[tender.country] ?? 0) + 1;
        return result;
      }, {}),
    [tenders],
  );

  const maxCountryCount = Math.max(...Object.values(countries), 1);

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Live performance from the connected tender workflow simulation."
      />

      <div className="grid grid-cols-12 gap-4">
        {[
          { label: 'Discovered', value: stats.discovered, icon: FileSearch },
          { label: 'Applications', value: stats.applications, icon: FileText },
          { label: 'Awaiting approval', value: stats.approvals, icon: FileCheck2 },
          { label: 'Submitted', value: stats.submitted, icon: Send },
          { label: 'Won', value: stats.won, icon: CheckCircle2 },
          { label: 'Markets', value: Object.keys(countries).length, icon: Globe2 },
        ].map((item) => (
          <DashboardCard
            key={item.label}
            className="col-span-12 p-5 sm:col-span-6 lg:col-span-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold">{item.value}</p>
              </div>
              <div className="shrink-0 rounded-md border border-border p-2">
                <item.icon className="h-4 w-4" />
              </div>
            </div>
          </DashboardCard>
        ))}

        <DashboardCard className="col-span-12 flex flex-col gap-0! lg:col-span-7">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 shrink-0" />
              Opportunities by market
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-5!">
            {Object.entries(countries).map(([country, count]) => (
              <div key={country}>
                <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
                  <span className="truncate">{country}</span>
                  <span className="shrink-0 text-muted-foreground">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(count / maxCountryCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </DashboardCard>

        <DashboardCard className="col-span-12 flex flex-col gap-0! lg:col-span-5">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              Recent African team activity
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border px-5!">
            {activity.slice(0, 7).map((item) => (
              <div key={item.id} className="py-3">
                <p className="text-sm leading-5 text-foreground">{item.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.at}</p>
              </div>
            ))}
          </CardContent>
        </DashboardCard>
      </div>
    </>
  );
}

export function SettingsPage() {
  const { settings, updateSettings, resetDemo } = useTenderWorkspace();
  const [draft, setDraft] = useState(settings);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const saveSettings = () => {
    updateSettings(draft);
    setMessage('Workflow settings saved.');
  };

  const options: Array<{
    key: keyof WorkspaceSettings;
    title: string;
    description: string;
    icon: typeof Settings;
  }> = [
    {
      key: 'emailAlerts',
      title: 'Email tender alerts',
      description: 'Send matched opportunities and deadline reminders by email.',
      icon: FileSearch,
    },
    {
      key: 'whatsappAlerts',
      title: 'WhatsApp alerts',
      description: 'Notify tender managers and approvers on WhatsApp.',
      icon: Users,
    },
    {
      key: 'autoPrepare',
      title: 'AI preparation',
      description: 'Prepare first-draft technical and compliance responses automatically.',
      icon: ShieldCheck,
    },
    {
      key: 'approvalRequired',
      title: 'Human approval required',
      description: 'Block submission until an authorised person approves the bid.',
      icon: CheckCircle2,
    },
  ];

  return (
    <>
      <PageHeader
        title="Settings"
        description="Control alerts, preparation rules and human approval safeguards."
      />

      <div className="grid grid-cols-12 gap-4">
        <DashboardCard className="col-span-12 flex flex-col gap-0! lg:col-span-8">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4 shrink-0" />
              Workflow preferences
            </CardTitle>
          </CardHeader>

          <CardContent className="divide-y divide-border px-5!">
            {options.map((option) => (
              <label
                key={option.key}
                className="flex cursor-pointer items-start justify-between gap-4 py-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="shrink-0 rounded-md border border-border p-2">
                    <option.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{option.title}</p>
                    <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={draft[option.key]}
                  onChange={(event) => {
                    setDraft((current) => ({
                      ...current,
                      [option.key]: event.target.checked,
                    }));
                    setMessage('');
                  }}
                  className="mt-1 h-4 w-4 shrink-0 accent-primary"
                />
              </label>
            ))}

            <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                {message}
              </p>
              <Button onClick={saveSettings} className="w-full sm:w-auto">
                Save settings
              </Button>
            </div>
          </CardContent>
        </DashboardCard>

        <DashboardCard className="col-span-12 flex flex-col gap-0! lg:col-span-4">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 shrink-0" />
              Simulation controls
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5!">
            <p className="text-sm leading-6 text-muted-foreground">
              Reset all browser-saved tenders, approvals, documents and settings to the
              original demonstration state.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                resetDemo();
                setMessage('Simulation reset to the original demo state.');
              }}
              className="mt-4 w-full"
            >
              Reset simulation
            </Button>
          </CardContent>
        </DashboardCard>
      </div>
    </>
  );
}

export function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText || 'This page could not be loaded.'
    : error instanceof Error
      ? error.message
      : 'This page could not be loaded.';

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <DashboardCard className="w-full max-w-md p-6 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg border border-border">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h1 className="mt-4 text-xl font-semibold">TenderPilot needs to reload</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{message}</p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Button
            variant="outline"
            render={<Link to="/" />}
            className="w-full sm:w-auto"
          >
            Open dashboard
          </Button>
          <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4" />
            Reload
          </Button>
        </div>
      </DashboardCard>
    </main>
  );
}

export function WorkflowOverviewStrip() {
  const { stats } = useTenderWorkspace();

  return (
    <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
      {[
        { label: 'Discovered', value: stats.discovered, icon: Radar },
        { label: 'Preparing', value: stats.applications, icon: Clock3 },
        { label: 'Approvals', value: stats.approvals, icon: FileCheck2 },
        { label: 'Submitted', value: stats.submitted, icon: Send },
      ].map((item) => (
        <div key={item.label} className="bg-background p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-xl font-semibold">{item.value}</p>
            </div>
            <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      ))}
    </div>
  );
}
