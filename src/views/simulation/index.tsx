import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Clock3,
  FileCheck2,
  FileText,
  Globe2,
  Inbox,
  Mail,
  MapPin,
  Radar,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

type SimulationStep = {
  eyebrow: string;
  title: string;
  description: string;
};

const steps: SimulationStep[] = [
  {
    eyebrow: "Step 1 of 7",
    title: "Tender sources are scanned automatically",
    description: "The system checks official procurement portals and detects new opportunities without staff searching manually.",
  },
  {
    eyebrow: "Step 2 of 7",
    title: "A suitable tender is discovered",
    description: "A PPE supply opportunity from Tema Metropolitan Assembly is captured, cleaned and added to the company workspace.",
  },
  {
    eyebrow: "Step 3 of 7",
    title: "AI checks whether the company qualifies",
    description: "The tender is compared against the company profile, experience, location, documents and preferred contract value.",
  },
  {
    eyebrow: "Step 4 of 7",
    title: "A personalised email alert is sent",
    description: "The right person receives a clear email explaining the opportunity, match score, deadline and missing requirement.",
  },
  {
    eyebrow: "Step 5 of 7",
    title: "The tender manager opens the alert",
    description: "One click opens the tender analysis, original notice, requirements and recommended next action.",
  },
  {
    eyebrow: "Step 6 of 7",
    title: "The application package is prepared",
    description: "The system drafts the technical response, builds the checklist and gathers approved company documents for review.",
  },
  {
    eyebrow: "Step 7 of 7",
    title: "The bid is approved and tracked",
    description: "An authorised manager reviews the package, approves submission and tracks the tender through evaluation and award.",
  },
];

const sourceNames = ["GHANEPS", "SA eTenders", "Kenya e-GP", "AfDB", "UNGM"];

function SourceScan() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-300">Live source monitor</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Scanning procurement portals</h3>
        </div>
        <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          <Radar className="h-7 w-7 animate-pulse" />
          <span className="absolute inset-0 animate-ping rounded-2xl border border-violet-300/60 dark:border-violet-500/30" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {sourceNames.map((source, index) => (
          <div key={source} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">
                <Globe2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{source}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Official source connected</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <Check className="h-3.5 w-3.5" /> Live
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-white/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">Sources checked</span>
          <span className="font-semibold">148</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[82%] animate-pulse rounded-full bg-violet-500" />
        </div>
        <p className="mt-3 text-xs text-slate-400">Checking new notices, amendments, deadlines and awards…</p>
      </div>
    </div>
  );
}

function TenderFound() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          <BellRing className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">New opportunity detected</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Captured 12 seconds ago from GHANEPS</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">PPE & Safety</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">GH-2026-0841</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-snug text-slate-950 dark:text-white">Supply and delivery of protective clothing and PPE</h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-slate-400" /> Tema Metropolitan Assembly</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /> Tema, Ghana</span>
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-slate-400" /> Closes in 11 days</span>
          <span className="flex items-center gap-2"><Trophy className="h-4 w-4 text-slate-400" /> Estimated GHS 2.4M</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Tender added to company workspace</p>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-300/70">AI qualification analysis has started.</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-emerald-600" />
      </div>
    </div>
  );
}

function MatchAnalysis() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-300">AI qualification report</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Strong match for Khensani Construction</h3>
        </div>
        <div className="grid h-20 w-20 place-items-center rounded-full border-8 border-emerald-100 bg-white text-center dark:border-emerald-500/15 dark:bg-white/5">
          <div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">94%</p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">match</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          ["Service category", "PPE supply matches company profile", true],
          ["Location", "Company can deliver within the required region", true],
          ["Experience", "4 similar contracts found in document vault", true],
          ["Compliance", "Product liability insurance needs renewal", false],
        ].map(([label, detail, passed]) => (
          <div key={String(label)} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 dark:border-white/10">
            <div className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${passed ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"}`}>
              {passed ? <Check className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{String(label)}</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{String(detail)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-200">
          <Bot className="h-4 w-4" /> AI recommendation: Apply
        </div>
        <p className="mt-2 text-xs leading-relaxed text-violet-700 dark:text-violet-300">The company meets all major eligibility requirements. Renew the insurance certificate before final submission.</p>
      </div>
    </div>
  );
}

function EmailSent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">Email alert sent</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Delivered to tenders@khensaniconstruction.co.za</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Check className="h-3.5 w-3.5" /> Delivered
        </span>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white"><Zap className="h-4 w-4" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-white">TenderPilot Intelligence</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">alerts@tenderpilot.africa</p>
            </div>
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">94% company match</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">A high-value PPE tender matches your company</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">We found a GHS 2.4M opportunity from Tema Metropolitan Assembly. Your company meets the service, location and experience requirements.</p>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-white/5">
            <div className="flex justify-between gap-4"><span className="text-slate-500">Deadline</span><span className="font-semibold text-slate-900 dark:text-white">12 Aug 2026</span></div>
            <div className="mt-2 flex justify-between gap-4"><span className="text-slate-500">Action needed</span><span className="font-semibold text-amber-600">Renew insurance</span></div>
          </div>
          <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white">
            Review this opportunity <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmailOpened() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><Inbox className="h-5 w-5" /></div>
        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-white">Tender manager opened the alert</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">The secure tender report opens directly from the email.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Opportunity</p>
          <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">Protective clothing and PPE</p>
          <p className="mt-1 text-xs text-slate-500">Tema Metropolitan Assembly</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Recommendation</p>
          <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">Proceed with application</p>
          <p className="mt-1 text-xs text-slate-500">94% qualification match</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">Requirement checklist</p>
          <span className="text-xs font-medium text-slate-500">4 of 5 ready</span>
        </div>
        <div className="mt-4 space-y-3">
          {["Business registration", "Tax clearance", "Similar contract evidence", "Manufacturer authorisation"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item}</div>
          ))}
          <div className="flex items-center gap-3 text-sm text-amber-700 dark:text-amber-300"><Clock3 className="h-4 w-4" /> Product liability insurance renewal</div>
        </div>
      </div>

      <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
        Start AI application preparation <Sparkles className="h-4 w-4" />
      </button>
    </div>
  );
}

function ApplicationPrepared() {
  const packageItems = [
    ["Technical proposal", "Generated"],
    ["Company experience", "4 projects inserted"],
    ["Methodology and delivery plan", "Generated"],
    ["Compliance attachments", "8 files collected"],
    ["Pricing schedule", "Waiting for finance"],
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-300">AI bid workspace</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Application package is 86% complete</h3>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><FileCheck2 className="h-5 w-5" /></div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        <div className="h-full w-[86%] rounded-full bg-violet-600 transition-all" />
      </div>

      <div className="space-y-3">
        {packageItems.map(([item, status], index) => (
          <div key={item} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className={`grid h-8 w-8 place-items-center rounded-xl ${index === packageItems.length - 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"}`}>
                {index === packageItems.length - 1 ? <Clock3 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{item}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">{status}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-white/5">
        <div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Human approval required</div>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">AI prepares the application, but pricing and final declarations remain under authorised company control.</p>
      </div>
    </div>
  );
}

function BidTracked() {
  return (
    <div className="space-y-5">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Approved by Managing Director</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Bid submitted and now being tracked</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">TenderPilot records the submission reference, monitors clarifications and keeps the team updated until the award decision.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Submitted", "01 Aug, 09:42"],
          ["Reference", "GH-0841-KC"],
          ["Current stage", "Evaluation"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 p-4 text-center dark:border-white/10">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">The entire process is visible in one workspace</p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-700 dark:text-emerald-300">No missed deadlines, scattered emails or repeated manual searches.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const panels = [SourceScan, TenderFound, MatchAnalysis, EmailSent, EmailOpened, ApplicationPrepared, BidTracked];

export default function SimulationLanding() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const ActivePanel = useMemo(() => panels[activeStep], [activeStep]);

  useEffect(() => {
    if (!playing) return undefined;
    const delay = activeStep === steps.length - 1 ? 4200 : 3000;
    const timer = window.setTimeout(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [activeStep, playing]);

  const replay = () => {
    setActiveStep(0);
    setPlaying(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-600 text-white"><Zap className="h-5 w-5" /></div>
            <div>
              <p className="font-semibold tracking-tight">TenderPilot</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Private tender automation system</p>
            </div>
          </div>
          <button type="button" onClick={() => navigate("/dashboard")} className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:flex">
            Open workspace <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
            <Sparkles className="h-3.5 w-3.5" /> Live product simulation
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Watch your private tender department work.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            TenderPilot discovers suitable opportunities, checks qualification, alerts the team, prepares the bid and tracks every submission from one workspace.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => navigate("/dashboard")} className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700">
              Explore the dashboard <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={replay} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
              <RefreshCw className="h-4 w-4" /> Replay simulation
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"><p className="text-2xl font-semibold">24/7</p><p className="mt-1 text-xs text-slate-500">Tender monitoring</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"><p className="text-2xl font-semibold">94%</p><p className="mt-1 text-xs text-slate-500">Example match</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"><p className="text-2xl font-semibold">1</p><p className="mt-1 text-xs text-slate-500">Unified workspace</p></div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">{steps[activeStep].eyebrow}</p>
              <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">Tender workflow simulation</p>
            </div>
            <button type="button" onClick={() => setPlaying((value) => !value)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">
              {playing ? <CirclePause className="h-4 w-4" /> : <CirclePlay className="h-4 w-4" />}
              {playing ? "Pause" : "Continue"}
            </button>
          </div>

          <div className="min-h-[530px] p-5 sm:p-7">
            <div key={activeStep} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              <ActivePanel />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.02]">
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">{steps[activeStep].title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{steps[activeStep].description}</p>
            <div className="mt-4 flex items-center gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => {
                    setActiveStep(index);
                    setPlaying(false);
                  }}
                  aria-label={`View ${step.title}`}
                  className={`h-2 flex-1 rounded-full transition ${index === activeStep ? "bg-violet-600" : index < activeStep ? "bg-violet-200 dark:bg-violet-500/30" : "bg-slate-200 dark:bg-white/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 sm:px-8">
          {[
            [FileText, "Every tender explained", "Long bid documents become clear requirements, deadlines and actions."],
            [ShieldCheck, "Controlled by your team", "AI prepares the work while authorised staff approve pricing and submission."],
            [Send, "Tracked after submission", "Clarifications, deadlines, evaluation stages and awards stay visible."],
          ].map(([Icon, title, description]) => {
            const FeatureIcon = Icon as typeof FileText;
            return (
              <div key={String(title)} className="flex gap-3 rounded-2xl p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><FeatureIcon className="h-5 w-5" /></div>
                <div><p className="text-sm font-semibold text-slate-950 dark:text-white">{String(title)}</p><p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{String(description)}</p></div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
