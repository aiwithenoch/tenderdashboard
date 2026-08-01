import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  FolderLock,
  Globe2,
  LayoutDashboard,
  MapPin,
  MoreHorizontal,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Trophy,
  Upload,
  UserRoundCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DashboardTab = "overview" | "tenders" | "applications" | "documents";
type TenderStatus = "Strong match" | "Review" | "Not eligible";
type ApplicationStatus = "Preparing" | "Awaiting approval" | "Submitted" | "Won";

type Tender = {
  id: string;
  title: string;
  buyer: string;
  country: string;
  category: string;
  deadline: string;
  daysLeft: number;
  value: string;
  score: number;
  status: TenderStatus;
  source: string;
  summary: string;
  requirements: string[];
  missing: string[];
};

type Application = {
  id: string;
  title: string;
  buyer: string;
  country: string;
  value: string;
  status: ApplicationStatus;
  progress: number;
  deadline: string;
  owner: string;
};

const tenders: Tender[] = [
  {
    id: "GH-2026-0841",
    title: "Supply and delivery of protective clothing and PPE",
    buyer: "Tema Metropolitan Assembly",
    country: "Ghana",
    category: "PPE & Safety",
    deadline: "12 Aug 2026",
    daysLeft: 11,
    value: "GHS 2.4M",
    score: 94,
    status: "Strong match",
    source: "GHANEPS",
    summary:
      "A framework contract for certified protective clothing, safety boots, helmets, gloves and reflective workwear for municipal field teams.",
    requirements: [
      "Valid business registration and tax clearance",
      "Three similar supply contracts completed in the last five years",
      "Manufacturer authorisation or approved distributor letter",
      "Delivery schedule covering four municipal depots",
    ],
    missing: ["Updated product liability insurance certificate"],
  },
  {
    id: "SA-2026-2197",
    title: "Facilities maintenance and industrial cleaning services",
    buyer: "Gauteng Department of Infrastructure",
    country: "South Africa",
    category: "Facilities",
    deadline: "17 Aug 2026",
    daysLeft: 16,
    value: "R 8.6M",
    score: 89,
    status: "Strong match",
    source: "eTenders",
    summary:
      "Three-year facilities maintenance contract covering industrial cleaning, minor repairs, grounds upkeep and emergency call-outs.",
    requirements: [
      "Active CSD registration",
      "Minimum five years facilities-management experience",
      "Health and safety plan",
      "Mandatory briefing attendance",
    ],
    missing: ["Briefing attendance confirmation"],
  },
  {
    id: "KE-2026-1304",
    title: "Provision of security guarding and access-control services",
    buyer: "Kenya Medical Supplies Authority",
    country: "Kenya",
    category: "Security",
    deadline: "22 Aug 2026",
    daysLeft: 21,
    value: "KES 34M",
    score: 81,
    status: "Review",
    source: "Kenya e-GP",
    summary:
      "Security personnel, access-control operations and incident reporting across central and regional warehouses.",
    requirements: [
      "Valid private-security licence",
      "Minimum 120 deployable guards",
      "Audited financial statements",
      "24/7 command centre",
    ],
    missing: ["Proof of 120 deployable guards", "Latest audited statements"],
  },
  {
    id: "TZ-2026-4420",
    title: "Supply of fire extinguishers and emergency safety equipment",
    buyer: "Tanzania Ports Authority",
    country: "Tanzania",
    category: "Fire & Safety",
    deadline: "9 Aug 2026",
    daysLeft: 8,
    value: "TZS 1.1B",
    score: 76,
    status: "Review",
    source: "NeST",
    summary:
      "Supply, installation and annual servicing of fire extinguishers, emergency signage and first-response equipment.",
    requirements: [
      "Authorised servicing technicians",
      "Product conformity certificates",
      "Local service centre",
      "Bid security",
    ],
    missing: ["Tanzania service-centre evidence", "Bid-security confirmation"],
  },
  {
    id: "RW-2026-0925",
    title: "Construction of district administration offices",
    buyer: "Rwanda Housing Authority",
    country: "Rwanda",
    category: "Construction",
    deadline: "28 Aug 2026",
    daysLeft: 27,
    value: "RWF 3.8B",
    score: 61,
    status: "Not eligible",
    source: "Umucyo",
    summary:
      "Design completion and construction of a multi-block district administration complex with associated civil works.",
    requirements: [
      "Top-tier local contractor classification",
      "Three completed public buildings above RWF 2B",
      "Performance security",
      "Local professional team",
    ],
    missing: ["Required contractor classification", "Comparable project threshold"],
  },
];

const applications: Application[] = [
  {
    id: "APP-0841",
    title: "Protective clothing and PPE supply",
    buyer: "Tema Metropolitan Assembly",
    country: "Ghana",
    value: "GHS 2.4M",
    status: "Awaiting approval",
    progress: 86,
    deadline: "12 Aug 2026",
    owner: "Finance Director",
  },
  {
    id: "APP-0752",
    title: "Industrial cleaning services",
    buyer: "National Health Laboratory",
    country: "South Africa",
    value: "R 4.2M",
    status: "Preparing",
    progress: 63,
    deadline: "15 Aug 2026",
    owner: "Tender Team",
  },
  {
    id: "APP-0618",
    title: "Safety boots and reflective workwear",
    buyer: "Uganda National Roads Authority",
    country: "Uganda",
    value: "UGX 780M",
    status: "Submitted",
    progress: 100,
    deadline: "Submitted 29 Jul",
    owner: "Procurement Lead",
  },
  {
    id: "APP-0504",
    title: "Facilities support services",
    buyer: "Accra Technical University",
    country: "Ghana",
    value: "GHS 1.1M",
    status: "Won",
    progress: 100,
    deadline: "Awarded 21 Jul",
    owner: "Managing Director",
  },
];

const opportunityTrend = [
  { month: "Mar", discovered: 31, qualified: 12 },
  { month: "Apr", discovered: 42, qualified: 18 },
  { month: "May", discovered: 51, qualified: 21 },
  { month: "Jun", discovered: 64, qualified: 27 },
  { month: "Jul", discovered: 83, qualified: 34 },
  { month: "Aug", discovered: 96, qualified: 41 },
];

const categoryData = [
  { category: "PPE", count: 34 },
  { category: "Facilities", count: 27 },
  { category: "Construction", count: 19 },
  { category: "Security", count: 16 },
  { category: "Cleaning", count: 13 },
];

const pipelineData = [
  { name: "Preparing", value: 6, color: "#8b5cf6" },
  { name: "Approval", value: 4, color: "#f59e0b" },
  { name: "Submitted", value: 11, color: "#3b82f6" },
  { name: "Won", value: 3, color: "#22c55e" },
];

const documents = [
  { name: "Business registration certificate", status: "Valid", expiry: "No expiry", type: "Corporate" },
  { name: "Tax clearance certificate", status: "Valid", expiry: "28 Feb 2027", type: "Compliance" },
  { name: "Product liability insurance", status: "Expiring", expiry: "19 Aug 2026", type: "Insurance" },
  { name: "Health and safety policy", status: "Valid", expiry: "12 Jan 2027", type: "Safety" },
  { name: "Audited financial statements", status: "Missing", expiry: "Required for 2 bids", type: "Financial" },
];

const statusStyles: Record<TenderStatus, string> = {
  "Strong match": "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
  Review: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
  "Not eligible": "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
};

const applicationStatusStyles: Record<ApplicationStatus, string> = {
  Preparing: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  "Awaiting approval": "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Submitted: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
  Won: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
};

const navItems: { id: DashboardTab; label: string; icon: LucideIcon; count?: number }[] = [
  { id: "overview", label: "Command centre", icon: LayoutDashboard },
  { id: "tenders", label: "Tender discovery", icon: Search, count: 23 },
  { id: "applications", label: "Applications", icon: BriefcaseBusiness, count: 8 },
  { id: "documents", label: "Document vault", icon: FolderLock, count: 2 },
];

function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 70) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

function KpiCard({
  title,
  value,
  helper,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  tone: "violet" | "blue" | "emerald" | "amber";
}) {
  const tones = {
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
        <div className={`rounded-xl p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
        {helper}
      </p>
    </div>
  );
}

function DashboardHeader({ onSearch }: { onSearch: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400">
          <Sparkles className="h-4 w-4" />
          Tender intelligence workspace
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Good morning, Khensani
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your autonomous tender desk found 9 new opportunities overnight.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search tenders, buyers or countries"
            className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>
        <button className="relative grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-card" />
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
          <Zap className="h-4 w-4" />
          Run tender scan
        </button>
      </div>
    </div>
  );
}

function TenderTable({
  items,
  onOpen,
}: {
  items: Tender[];
  onOpen: (tender: Tender) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Recommended opportunities</h2>
          <p className="mt-1 text-sm text-muted-foreground">Ranked against your company profile and current documents.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Opportunity</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Deadline</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">AI match</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((tender) => (
              <tr key={tender.id} className="group transition hover:bg-muted/40">
                <td className="px-5 py-4">
                  <button onClick={() => onOpen(tender)} className="text-left">
                    <p className="max-w-md font-medium text-foreground transition group-hover:text-violet-600">
                      {tender.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {tender.buyer} · {tender.source} · {tender.id}
                    </p>
                  </button>
                </td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-1.5 text-sm text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {tender.country}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">{tender.category}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-foreground">{tender.deadline}</p>
                  <p className={`mt-1 text-xs ${tender.daysLeft <= 10 ? "text-rose-500" : "text-muted-foreground"}`}>
                    {tender.daysLeft} days remaining
                  </p>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-foreground">{tender.value}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-semibold ${scoreColor(tender.score)}`}>{tender.score}%</span>
                    <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          tender.score >= 85 ? "bg-emerald-500" : tender.score >= 70 ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${tender.score}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[tender.status]}`}>
                    {tender.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => onOpen(tender)}
                    className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`Open ${tender.title}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Overview({ tenders: visibleTenders, onOpen }: { tenders: Tender[]; onOpen: (tender: Tender) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Matched opportunities" value="23" helper="9 added since yesterday" icon={Search} tone="violet" />
        <KpiCard title="Applications active" value="8" helper="4 require your approval" icon={BriefcaseBusiness} tone="blue" />
        <KpiCard title="Pipeline value" value="$1.84M" helper="Across six African markets" icon={CircleDollarSign} tone="amber" />
        <KpiCard title="Contracts won" value="3" helper="GHS 4.7M awarded this quarter" icon={Trophy} tone="emerald" />
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm xl:col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Opportunity intelligence</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tenders discovered versus opportunities your company can pursue.</p>
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={opportunityTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="discoveredGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 12px 30px rgba(15,23,42,.12)" }}
                />
                <Area type="monotone" dataKey="discovered" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#discoveredGradient)" />
                <Area type="monotone" dataKey="qualified" stroke="#22c55e" strokeWidth={2.5} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-500" />Discovered</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Qualified</span>
          </div>
        </div>

        <div className="space-y-4 xl:col-span-4">
          <div className="rounded-2xl border border-border bg-slate-950 p-5 text-white shadow-sm dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-white/10 p-3"><Sparkles className="h-5 w-5 text-violet-300" /></div>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-medium text-emerald-300">Live</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">AI Tender Analyst</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              I reviewed 41 notices today and removed 32 that failed your location, experience or compliance rules.
            </p>
            <button className="mt-5 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              View analyst briefing
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/10">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-amber-950 dark:text-amber-100">2 compliance actions</p>
                <p className="mt-1 text-sm leading-5 text-amber-800 dark:text-amber-200/80">
                  Insurance expires in 18 days. Audited statements are missing from the document vault.
                </p>
                <button className="mt-3 text-sm font-semibold text-amber-900 underline underline-offset-4 dark:text-amber-200">Resolve now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TenderTable items={visibleTenders.slice(0, 4)} onOpen={onOpen} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Application pipeline</h2>
              <p className="mt-1 text-sm text-muted-foreground">Current progress across all active submissions.</p>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {pipelineData.map((item) => (
              <div key={item.name} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="h-2 w-10 rounded-full" style={{ backgroundColor: item.color }} />
                <p className="mt-4 text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {applications.slice(0, 3).map((application) => (
              <div key={application.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{application.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{application.buyer} · {application.country}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="mb-1 flex justify-between text-[11px] text-muted-foreground"><span>Progress</span><span>{application.progress}%</span></div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-violet-500" style={{ width: `${application.progress}%` }} /></div>
                  </div>
                  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${applicationStatusStyles[application.status]}`}>{application.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">Opportunities by category</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your highest-volume markets.</p>
          <div className="mt-5 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: -16, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-border" />
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} width={84} />
                <Tooltip cursor={{ fill: "rgba(139,92,246,.06)" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} barSize={13} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function TenderDiscovery({ items, onOpen }: { items: Tender[]; onOpen: (tender: Tender) => void }) {
  const [statusFilter, setStatusFilter] = useState<"All" | TenderStatus>("All");
  const filtered = statusFilter === "All" ? items : items.filter((item) => item.status === statusFilter);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-100">Discovery engine</p>
            <h2 className="mt-1 text-2xl font-semibold">23 qualified tenders from 11 connected sources</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100">
              The system continuously checks official procurement portals, removes unsuitable notices and scores the remaining opportunities against your company profile.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15"><RefreshCw className="mr-2 inline h-4 w-4" />Sync sources</button>
            <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50"><Settings className="mr-2 inline h-4 w-4" />Matching rules</button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["All", "Strong match", "Review", "Not eligible"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              statusFilter === status ? "bg-foreground text-background" : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <TenderTable items={filtered} onOpen={onOpen} />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Globe2, title: "11 connected sources", text: "National portals, development banks and institutional procurement pages." },
          { icon: ShieldCheck, title: "Compliance-aware matching", text: "Documents, licences, experience and regional eligibility are checked automatically." },
          { icon: Bell, title: "Deadline intelligence", text: "Briefings, clarifications, amendments and closing dates are tracked together." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="w-fit rounded-xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><Icon className="h-5 w-5" /></div>
            <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationsView() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Live bid pipeline</h2>
              <p className="mt-1 text-sm text-muted-foreground">Every tender from qualification to award.</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700"><Sparkles className="h-4 w-4" />Prepare new bid</button>
          </div>
          <div className="mt-6 space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="rounded-2xl border border-border p-5 transition hover:border-violet-300 hover:shadow-sm dark:hover:border-violet-500/40">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${applicationStatusStyles[application.status]}`}>{application.status}</span>
                      <span className="text-xs text-muted-foreground">{application.id}</span>
                    </div>
                    <h3 className="mt-3 font-semibold text-foreground">{application.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{application.buyer} · {application.country}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="font-semibold text-foreground">{application.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{application.deadline}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground"><span>Application completeness</span><span>{application.progress}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${application.progress}%` }} /></div>
                </div>
                <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground"><UserRoundCheck className="h-4 w-4" />Current owner: {application.owner}</span>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"><Eye className="mr-1.5 inline h-3.5 w-3.5" />Review</button>
                    {application.status === "Awaiting approval" && <button className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"><Check className="mr-1.5 inline h-3.5 w-3.5" />Approve</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-semibold text-foreground">Pipeline distribution</h2>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pipelineData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={82} paddingAngle={4}>
                    {pipelineData.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {pipelineData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name} ({item.value})</div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <Trophy className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
            <p className="mt-4 text-2xl font-semibold text-emerald-950 dark:text-emerald-100">27.3%</p>
            <p className="mt-1 text-sm font-medium text-emerald-900 dark:text-emerald-200">Current tender win rate</p>
            <p className="mt-2 text-xs leading-5 text-emerald-800 dark:text-emerald-200/80">Up 8.1% since introducing qualification scoring and structured approvals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsView() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Documents stored" value="48" helper="Encrypted company vault" icon={FolderLock} tone="violet" />
        <KpiCard title="Valid and ready" value="44" helper="Automatically attached to bids" icon={FileCheck2} tone="emerald" />
        <KpiCard title="Action required" value="2" helper="One expiring, one missing" icon={CircleAlert} tone="amber" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Company document vault</h2>
            <p className="mt-1 text-sm text-muted-foreground">Documents are reused only where tender requirements match.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"><Upload className="h-4 w-4" />Upload document</button>
        </div>
        <div className="divide-y divide-border">
          {documents.map((document) => (
            <div key={document.name} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-xl bg-muted p-3 text-muted-foreground"><FileText className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{document.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{document.type} · {document.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  document.status === "Valid"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : document.status === "Expiring"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                }`}>{document.status}</span>
                <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"><ShieldCheck className="h-5 w-5" /></div>
          <div>
            <h3 className="font-semibold text-foreground">Controlled document use</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              TenderPilot never invents certifications, experience or financial records. Every generated application references approved company information and records who reviewed each attachment before submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TenderDrawer({ tender, onClose }: { tender: Tender; onClose: () => void }) {
  const [prepared, setPrepared] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/45 backdrop-blur-sm" role="dialog" aria-modal="true">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close tender details" />
      <div className="relative h-full w-full max-w-2xl overflow-y-auto bg-background shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-violet-600">{tender.source} · {tender.id}</p>
            <p className="mt-1 text-sm text-muted-foreground">Tender intelligence report</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[tender.status]}`}>{tender.status}</span>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{tender.category}</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground">{tender.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{tender.buyer}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: MapPin, label: "Country", value: tender.country },
              { icon: CalendarDays, label: "Deadline", value: tender.deadline },
              { icon: CircleDollarSign, label: "Value", value: tender.value },
              { icon: Sparkles, label: "AI match", value: `${tender.score}%` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-3">
                <Icon className="h-4 w-4 text-violet-500" />
                <p className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-500/20 dark:bg-violet-500/10">
            <div className="flex items-center gap-2 text-violet-800 dark:text-violet-200"><Sparkles className="h-4 w-4" /><span className="text-sm font-semibold">AI summary</span></div>
            <p className="mt-3 text-sm leading-6 text-violet-950 dark:text-violet-100">{tender.summary}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Qualification report</h3>
            <div className="mt-3 space-y-2">
              {tender.requirements.map((requirement) => (
                <div key={requirement} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-sm text-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Actions required</h3>
            <div className="mt-3 space-y-2">
              {tender.missing.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/20 dark:bg-amber-500/10">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                  <span className="text-sm text-amber-950 dark:text-amber-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Application package</h3>
                <p className="mt-1 text-sm text-muted-foreground">Generate a review-ready bid using approved company data.</p>
              </div>
              <FileCheck2 className="h-6 w-6 text-violet-500" />
            </div>
            {prepared ? (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200"><BadgeCheck className="h-4 w-4" />Draft package prepared</div>
                <p className="mt-2 text-xs leading-5 text-emerald-700 dark:text-emerald-200/80">Technical response, compliance checklist and document folder are ready for human review.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white"><Eye className="mr-1.5 inline h-3.5 w-3.5" />Review package</button>
                  <button className="rounded-lg border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-200"><Download className="mr-1.5 inline h-3.5 w-3.5" />Download</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setPrepared(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700"><Sparkles className="h-4 w-4" />Prepare application with AI</button>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col gap-3 border-t border-border bg-background/95 p-5 backdrop-blur sm:flex-row">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted"><Download className="h-4 w-4" />Official documents</button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950"><Send className="h-4 w-4" />Start application</button>
        </div>
      </div>
    </div>
  );
}

const TenderDashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const visibleTenders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return tenders;
    return tenders.filter((tender) =>
      [tender.title, tender.buyer, tender.country, tender.category, tender.source, tender.id]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-muted/25">
      <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
        <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">TenderPilot Enterprise</p>
                <p className="text-xs text-muted-foreground">Ubuntu Build & Safety Ltd.</p>
              </div>
            </div>
            <nav className="flex gap-1 overflow-x-auto rounded-xl bg-muted/60 p-1">
              {navItems.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    activeTab === id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {count !== undefined && <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px]">{count}</span>}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-foreground">Khensani Ndlozi</p>
                <p className="text-xs text-muted-foreground">Tender Manager</p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">KN</div>
            </div>
          </div>
        </div>

        <DashboardHeader onSearch={setSearchTerm} />

        <div className="mt-6">
          {activeTab === "overview" && <Overview tenders={visibleTenders} onOpen={setSelectedTender} />}
          {activeTab === "tenders" && <TenderDiscovery items={visibleTenders} onOpen={setSelectedTender} />}
          {activeTab === "applications" && <ApplicationsView />}
          {activeTab === "documents" && <DocumentsView />}
        </div>

        <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Private enterprise installation · Demo data only</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" />Human approval required before any tender submission</span>
        </div>
      </div>

      {selectedTender && <TenderDrawer tender={selectedTender} onClose={() => setSelectedTender(null)} />}
    </div>
  );
};

export default TenderDashboard;
