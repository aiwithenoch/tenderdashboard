'use client'
import { useEffect, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { DashboardCard } from '../../shared/dashboard-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const simulationSteps = [
  'Scanning GHANEPS, South Africa eTenders, Kenya e-GP, AfDB and UNGM',
  'New PPE tender detected from Tema Metropolitan Assembly',
  'Company profile checked — 94% qualification match',
  'Personalised tender alert sent to the tender manager by email',
  'Tender requirements opened and one missing document identified',
  'Technical response, checklist and bid package prepared for review',
  'Application moved to management approval and submission tracking',
];

export default function UpdateBanner() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % simulationSteps.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <DashboardCard className="py-3">
      <CardContent className="flex items-center flex-wrap justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-chart-1 animate-ping absolute inline-flex" />
            <span className="h-2 w-2 rounded-full bg-chart-1 absolute inline-flex" />
            <p className="text-sm font-medium ps-4">Live Simulation</p>
            <span className="w-1 h-1 rounded-full bg-border" />
            <p className="text-sm font-normal text-muted-foreground">
              Step {step + 1} of {simulationSteps.length}
            </p>
          </div>
          <p className="text-sm font-normal">{simulationSteps[step]}</p>
        </div>
        <Button
          variant="outline"
          className="flex gap-1.5 px-4 py-2 h-auto rounded-md cursor-pointer"
          onClick={() => setStep((current) => (current + 1) % simulationSteps.length)}
        >
          Next Step
          <ArrowRight width={18} height={18} />
        </Button>
      </CardContent>
    </DashboardCard>
  );
}
