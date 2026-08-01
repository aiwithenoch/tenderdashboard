'use client'
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CardContent } from '@/components/ui/card';
import { DashboardCard } from '../../shared/dashboard-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const simulationSteps = [
  {
    text: 'Aline Uwimana is scanning GHANEPS, South Africa eTenders, Kenya e-GP, AfDB and UNGM',
    href: '/tenders',
    action: 'View discovery',
  },
  {
    text: 'A new PPE tender was detected from Tema Metropolitan Assembly',
    href: '/tenders',
    action: 'Open opportunity',
  },
  {
    text: 'Ama Serwaa Mensah checked the company profile and confirmed a 94% qualification match',
    href: '/company-profile',
    action: 'View company profile',
  },
  {
    text: 'A personalised tender email was sent to Ama Serwaa Mensah with the deadline and next action',
    href: '/applications',
    action: 'Open application',
  },
  {
    text: 'Thabo Mokoena opened the requirements and identified one missing insurance document',
    href: '/documents',
    action: 'Open document vault',
  },
  {
    text: 'Amina Njoroge prepared the technical response, checklist and bid package for review',
    href: '/approvals',
    action: 'Review bid package',
  },
  {
    text: 'Ama Serwaa Mensah approved the bid and Kato Ssemanda moved it into submission tracking',
    href: '/submissions',
    action: 'Track submission',
  },
];

export default function UpdateBanner() {
  const [step, setStep] = useState(0);
  const activeStep = simulationSteps[step];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % simulationSteps.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <DashboardCard className="py-3">
      <CardContent className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-1 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-chart-1" />
            </span>
            <p className="text-sm font-medium">Live Simulation</p>
            <span className="h-1 w-1 shrink-0 rounded-full bg-border" />
            <p className="text-sm font-normal text-muted-foreground">
              Step {step + 1} of {simulationSteps.length}
            </p>
          </div>
          <p className="mt-1 text-sm font-normal leading-5">{activeStep.text}</p>
        </div>

        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <Button
            variant="outline"
            className="h-9 flex-1 rounded-md px-3 sm:flex-none"
            onClick={() => setStep((current) => (current + 1) % simulationSteps.length)}
          >
            Next
          </Button>
          <Button
            render={<Link to={activeStep.href} />}
            className="h-9 flex-1 gap-1.5 rounded-md px-4 sm:flex-none"
          >
            {activeStep.action}
            <ArrowRight width={18} height={18} />
          </Button>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
