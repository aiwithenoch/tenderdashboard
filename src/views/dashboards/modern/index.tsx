import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  FolderLock,
  LayoutDashboard,
  Mail,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Tab = "overview" | "tenders" | "applications" | "documents";

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
  source: string;
  summary: string;
  requirements: string[];
  missing: string[];
};

type Application = {
  id: string;
  title: string;
  buyer: string;
  stage: string;
  progress: number;
  deadline: string;
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
    source: "GHANEPS",
    summary:
      "Framework contract for certified safety boots, helmets, gloves, reflective workwear and protective clothing.",
    requirements: [
      "Valid business registration and tax clearance",
      "Three similar supply contracts in the last five years",
      "Manufacturer authorisation or distributor letter",
      "Delivery plan for four municipal depots",
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
    source: "eTenders",
    summary:
      "Three-year facilities contract covering industrial cleaning, minor repairs, grounds upkeep and emergency call-outs.",
    requirements: [
      "Active CSD registration",
      "Five years of facilities-management experience",
      "Health and safety plan",
      "Mandatory briefing attendance",
    ],
    missing: ["Briefing attendance confirmation"],
  },
  {
    id: "KE-2026-1304",
    title: "Security guarding and access-control services",
    buyer: "Kenya Medical Supplies Authority",
    country: "Kenya",
    category: "Security",
    deadline: "22 Aug 2026",
    daysLeft: 21,
    value: "KES 34M",
    score: 81,
    source: "Kenya e-GP",
    summary:
      "Security personnel and access-control operations across central and regional medical warehouses.",
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
    title: "Fire extinguishers and emergency safety equipment",
    buyer: "Tanzania Ports Authority",
    country: "Tanzania",
    category: "Fire & Safety",
    deadline: "9 Aug 2026",
    daysLeft: 8,
    value: "TZS 1.1B",
    score: 76,
    source: "NeST",
    summary:
      "Supply, installation and annual servicing of extinguishers, emergency signage and first-response equipment.",
    requirements: [
      "Authorised servicing technicians",
      "Product conformity certificates",
      "Local service centre",
      "Bid security",
    ],
    missing: ["Local service-centre evidence", "Bid-security confirmation"],
  },
];

const applications: Application[] = [
  {
    id: "APP-0841",
    title: "Protective clothing and PPE supply",
    buyer: "Tema Metropolitan Assembly",
    stage: "Awaiting approval",
    progress: 86,
    deadline: "12 Aug 2026",
  },
  {
    id: "APP-0752",
    title: "Industrial cleaning services",
    buyer: "National Health Laboratory",
    stage: "Preparing",
    progress: 63,
    deadline: "15 Aug 2026",
  },
  {
    id: "APP-0618",
    title: "Safety boots and reflective workwear",
    buyer: "Uganda National Roads Authority",
    stage: "Submitted",
    progress: 100,
    deadline: "Submitted 29 Jul",
  },
];

const documents = [
  { name: "Business registration certificate", status: "Valid", detail: "No expiry" },
  { name: "Tax clearance certificate", status: "Valid", detail: "Expires 28 Feb 2027" },
  { name: "Product liability insurance", status: "Action needed", detail: "Expires 19 Aug 2026" },
  { name: "Audited financial statements", status: "Missing", detail: "Required for 2 bids" },
];

const navItems: { id: Tab; label: string; icon: LucideIcon; count?: number }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tenders", label: "Tender opportunities", icon: Search, count: 23 },
  { id: "applications", label: "Bid workspace", icon: BriefcaseBusiness, count: 8 },
  { id: "documents", label: "Compliance vault", icon: FolderLock, count: 2 },
];

function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
        <div className="rounded-lg bg-muted p-3 text-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

function TenderList({ items, onOpen }: { items: Tender[]; onOpen: (tender: Tender) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-semibold text-foreground">Recommended opportunities</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ranked against the company profile and available compliance documents.
        </p>
      </div>
      <div className="divide-y divide-border">
        {items.map((tender) => (
          <button
            key={tender.id}
            type="button"
            onClick={() => onOpen(tender)}
            className="grid w-full gap-4 px-5 py-4 text-left transition hover:bg-muted/60 md:grid-cols-[minmax(0,1fr)_150px_120px_80px_auto] md:items-center"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{tender.title}</p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {tender.buyer} · {tender.source} · {tender.id}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm text-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {tender.country}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{tender.category}</p>
            </div>
            <div>
              <p className="text-sm text-foreground">{tender.deadline}</p>
              <p className="mt-1 text-xs text-muted-foreground">{tender.daysLeft} days left</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{tender.score}%</p>
              <p className="text-xs text-muted-foreground">AI match</p>
            </div>
            <ChevronRight className="hidden h-4 w-4 text-muted-foreground md:block" />
          </button>
        ))}
      </div>
    </div>
  );
}

function TenderPanel({ tender, onClose }: { tender: Tender; onClose: () => void }) {
  const [prepared, setPrepared] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20" role="dialog" aria-modal="true">
      <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-border bg-background p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{tender.id} · {tender.source}</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">{tender.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{tender.buyer}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close tender details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">Match score</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{tender.score}%</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">Estimated value</p>
            <p className="mt-1 font-semibold text-foreground">{tender.value}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p className="mt-1 font-semibold text-foreground">{tender.deadline}</p>
          </div>
        </div>

        <section className="mt-8">
          <h3 className="font-semibold text-foreground">AI summary</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{tender.summary}</p>
        </section>

        <section className="mt-8">
          <h3 className="font-semibold text-foreground">Mandatory requirements</h3>
          <div className="mt-3 space-y-3">
            {tender.requirements.map((requirement) => (
              <div key={requirement} className="flex gap-3 rounded-lg border border-border p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                <span className="text-sm text-foreground">{requirement}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-semibold text-foreground">Missing or unresolved</h3>
          <div className="mt-3 space-y-3">
            {tender.missing.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-border bg-muted/50 p-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 rounded-xl border border-border bg-card p-5">
          {prepared ? (
            <div>
              <div className="flex items-center gap-2 font-medium text-foreground">
                <FileCheck2 className="h-5 w-5" />
                Application workspace created
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                The technical response, compliance checklist and approved company documents are ready for human review.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-foreground">Prepare this tender</p>
                <p className="mt-1 text-sm text-muted-foreground">Create a reviewable application package from approved company data.</p>
              </div>
              <button
                type="button"
                onClick={() => setPrepared(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <Sparkles className="h-4 w-4" />
                Prepare with AI
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TenderDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [query, setQuery] = useState("");
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);

  const filteredTenders = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return tenders;
    return tenders.filter((tender) =>
      [tender.title, tender.buyer, tender.country, tender.category, tender.source]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">TenderPilot Enterprise</p>
              <p className="text-xs text-muted-foreground">Ubuntu Build & Safety Ltd.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-lg border border-border p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-semibold text-foreground">KN</div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">Khensani Ndlozi</p>
                <p className="text-xs text-muted-foreground">Tender Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-xl border border-border bg-card p-3">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.count ? <span className="text-xs opacity-80">{item.count}</span> : null}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            <a href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Replay simulation
            </a>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                Tender intelligence workspace
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Good morning, Khensani</h1>
              <p className="mt-2 text-sm text-muted-foreground">Your tender desk found 9 new opportunities overnight.</p>
            </div>
            <div className="relative w-full xl:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tenders, buyers or countries"
                className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none focus:border-foreground"
              />
            </div>
          </div>

          {activeTab === "overview" ? (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Matched opportunities" value="23" helper="9 added since yesterday" icon={Search} />
                <MetricCard label="Applications active" value="8" helper="4 require approval" icon={BriefcaseBusiness} />
                <MetricCard label="Pipeline value" value="$1.84M" helper="Across six African markets" icon={Building2} />
                <MetricCard label="Contracts won" value="3" helper="GHS 4.7M awarded this quarter" icon={CheckCircle2} />
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="font-semibold text-foreground">Opportunity intelligence</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Tenders discovered versus qualified opportunities.</p>
                    </div>
                    <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-foreground">Last 6 months</span>
                  </div>
                  <div className="mt-8 grid grid-cols-6 items-end gap-3" aria-label="Opportunity trend chart">
                    {[31, 42, 51, 64, 83, 96].map((value, index) => (
                      <div key={value} className="flex flex-col items-center gap-2">
                        <div className="flex h-44 w-full items-end rounded-md bg-muted p-1">
                          <div className="w-full rounded bg-primary" style={{ height: `${value}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{["Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <Sparkles className="h-5 w-5" />
                      AI Tender Analyst
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      I reviewed 41 notices today and removed 32 that failed your location, experience or compliance rules.
                    </p>
                    <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      View analyst briefing <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/50 p-5">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <ShieldCheck className="h-5 w-5" />
                      2 compliance actions
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Insurance expires in 18 days. Audited statements are missing from the vault.
                    </p>
                  </div>
                </div>
              </div>

              <TenderList items={filteredTenders.slice(0, 4)} onOpen={setSelectedTender} />
            </div>
          ) : null}

          {activeTab === "tenders" ? (
            <div className="mt-6">
              <TenderList items={filteredTenders} onOpen={setSelectedTender} />
            </div>
          ) : null}

          {activeTab === "applications" ? (
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
              <div className="border-b border-border p-5">
                <h2 className="font-semibold text-foreground">Application pipeline</h2>
                <p className="mt-1 text-sm text-muted-foreground">Current progress across active submissions.</p>
              </div>
              <div className="divide-y divide-border">
                {applications.map((application) => (
                  <div key={application.id} className="p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-foreground">{application.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{application.buyer} · {application.id}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium text-foreground">{application.stage}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{application.deadline}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${application.progress}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{application.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "documents" ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {documents.map((document) => (
                <div key={document.name} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="rounded-lg bg-muted p-2.5 text-foreground">
                        <FileCheck2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{document.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{document.detail}</p>
                      </div>
                    </div>
                    <span className="rounded-md border border-border px-2 py-1 text-xs text-foreground">{document.status}</span>
                  </div>
                </div>
              ))}
              <button type="button" className="flex min-h-28 items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card text-sm font-medium text-foreground hover:bg-muted">
                <FileText className="h-4 w-4" />
                Add company document
              </button>
            </div>
          ) : null}

          <footer className="mt-8 flex flex-col gap-2 border-t border-border py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Private enterprise installation · Demo data only</span>
            <span>Human approval required before submission</span>
          </footer>
        </main>
      </div>

      {selectedTender ? <TenderPanel tender={selectedTender} onClose={() => setSelectedTender(null)} /> : null}
    </div>
  );
}
