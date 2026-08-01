import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CirclePause,
  CirclePlay,
  FileCheck2,
  FileText,
  Mail,
  Radar,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Tender sources are scanned automatically",
    description: "The system checks official procurement portals and detects new opportunities without staff searching manually.",
  },
  {
    title: "A suitable tender is discovered",
    description: "A PPE supply opportunity from Tema Metropolitan Assembly is captured and added to the company workspace.",
  },
  {
    title: "AI checks whether the company qualifies",
    description: "The tender is compared with the company profile, experience, location, documents and preferred contract value.",
  },
  {
    title: "A personalised email alert is sent",
    description: "The tender manager receives a clear email with the opportunity, match score, deadline and missing requirement.",
  },
  {
    title: "The tender manager opens the alert",
    description: "One click opens the analysis, original notice, requirements and recommended next action.",
  },
  {
    title: "The application package is prepared",
    description: "The system drafts the technical response, builds the checklist and gathers approved company documents.",
  },
  {
    title: "The bid is approved and tracked",
    description: "An authorised manager reviews the package, approves submission and tracks the tender through evaluation.",
  },
];

function StageVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Radar className="h-5 w-5" />
            Live source scan
          </div>
          <span className="rounded-md border border-border px-2 py-1 text-xs text-foreground">Running</span>
        </div>
        {["GHANEPS", "South Africa eTenders", "Kenya e-GP", "AfDB", "UNGM"].map((source, index) => (
          <div key={source} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-muted text-xs font-semibold text-foreground">{index + 1}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{source}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${72 + index * 5}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">GHANEPS · GH-2026-0841</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">Supply and delivery of protective clothing and PPE</h3>
            <p className="mt-2 text-sm text-muted-foreground">Tema Metropolitan Assembly · Ghana</p>
          </div>
          <FileText className="h-6 w-6 text-foreground" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Value</p>
            <p className="mt-1 font-medium text-foreground">GHS 2.4M</p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p className="mt-1 font-medium text-foreground">12 Aug 2026</p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="mt-1 font-medium text-foreground">PPE & Safety</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <p className="text-sm text-muted-foreground">Company qualification score</p>
          <p className="mt-3 text-6xl font-semibold tracking-tight text-foreground">94%</p>
          <p className="mt-2 text-sm font-medium text-foreground">Strong match</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Category match", "Past experience", "Location eligibility", "Document readiness"].map((item, index) => (
            <div key={item} className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm text-foreground">{item}</span>
              <span className="text-sm font-medium text-foreground">{[100, 92, 100, 84][index]}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Mail className="h-4 w-4" />
            New tender match
          </div>
          <span className="text-xs text-muted-foreground">Just now</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-muted-foreground">To: khensani@ubuntubuild.co.za</p>
          <h3 className="mt-4 text-lg font-semibold text-foreground">A 94% tender match was found for Ubuntu Build & Safety</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            TenderPilot found a GHS 2.4M PPE supply opportunity that matches your company profile. The deadline is 12 August 2026.
          </p>
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-sm font-medium text-foreground">One action is needed</p>
            <p className="mt-1 text-sm text-muted-foreground">Upload an updated product liability insurance certificate.</p>
          </div>
          <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
            Review tender <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Tender analysis</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">Protective clothing and PPE supply</h3>
            </div>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">94% match</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            The company meets the service category, location and experience requirements. One insurance document needs updating before submission.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm font-medium text-foreground">4 requirements ready</p>
            <p className="mt-1 text-xs text-muted-foreground">Registration, tax clearance, experience and distributor letter</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm font-medium text-foreground">1 action needed</p>
            <p className="mt-1 text-xs text-muted-foreground">Updated insurance certificate</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="space-y-3">
        {["Technical response drafted", "Compliance checklist created", "Company profile attached", "Past projects selected", "Pricing schedule prepared"].map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item}</p>
              <p className="mt-1 text-xs text-muted-foreground">Completed in {index + 1}.{index + 2} seconds</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Application approved</p>
            <p className="text-sm text-muted-foreground">Approved by Finance Director</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Prepared", "Complete"],
          ["Approved", "Complete"],
          ["Submission", "Tracked"],
        ].map(([label, status]) => (
          <div key={label} className="rounded-lg border border-border p-4 text-center">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{status}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-muted/50 p-5">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <ShieldCheck className="h-5 w-5" />
          Human approval remains required
        </div>
        <p className="mt-2 text-sm text-muted-foreground">The system prepares and tracks the bid while authorised staff retain final control.</p>
      </div>
    </div>
  );
}

export default function SimulationLanding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setCurrentStep((previous) => (previous + 1) % steps.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [playing]);

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">TenderPilot Enterprise</p>
              <p className="text-xs text-muted-foreground">Interactive workflow simulation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Open workspace <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-16">
        <section className="flex flex-col justify-center">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            See the full tender workflow
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Watch a tender move from discovery to submission.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            This simulation shows how a private tender intelligence system scans opportunities, checks eligibility, alerts the team and prepares the bid for approval.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {playing ? <CirclePause className="h-4 w-4" /> : <CirclePlay className="h-4 w-4" />}
              {playing ? "Pause simulation" : "Continue simulation"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentStep(0);
                setPlaying(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              <RefreshCw className="h-4 w-4" />
              Restart
            </button>
          </div>

          <div className="mt-10 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Example company</p>
                <p className="text-sm text-muted-foreground">Ubuntu Build & Safety Ltd.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">{steps[currentStep].title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{steps[currentStep].description}</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-foreground">
              {[Radar, FileText, Sparkles, Mail, Send, FileCheck2, CheckCircle2][currentStep]({ className: "h-5 w-5" })}
            </div>
          </div>

          <div className="mt-6 min-h-[420px]">
            <StageVisual step={currentStep} />
          </div>

          <div className="mt-6">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => {
                    setCurrentStep(index);
                    setPlaying(false);
                  }}
                  className={`h-2 rounded-full transition ${index === currentStep ? "bg-primary" : "bg-muted"}`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
