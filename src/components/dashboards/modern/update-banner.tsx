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
    text: 'A personalised tender email was sent to Khensani Ndlozi with the deadline and next action',
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
    text: 'Khensani Ndlozi approved the bid and Kato Ssemanda moved it into submission tracking',
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
          <p className="text-sm font-normal">{activeStep.text}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-auto rounded-md px-3 py-2 cursor-pointer"
            onClick={() => setStep((current) => (current + 1) % simulationSteps.length)}
          >
            Next
          </Button>
          <Link to={activeStep.href}>
            <Button className="flex gap-1.5 px-4 py-2 h-auto rounded-md cursor-pointer">
              {activeStep.action}
              <ArrowRight width={18} height={18} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
