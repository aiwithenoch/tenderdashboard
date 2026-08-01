'use client'
import type { ElementType } from 'react';
import { Link } from 'react-router';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardCard } from '../../shared/dashboard-card';
import { CheckCircle2, FileText, FileWarning, Layers3, SearchCheck } from 'lucide-react';
import { useTenderWorkspace } from '@/context/tender/TenderWorkspaceContext';

type AssetCardProps = {
  title: string;
  href: string;
  value: string | number;
  icon: ElementType;
};

function AssetCard({ title, href, value, icon: Icon }: AssetCardProps) {
  return (
    <Link to={href} className="flex flex-col justify-between p-6 bg-background hover:bg-muted/30 transition-colors">
      <div className="border border-border rounded-md p-2 w-fit">
        <Icon width={16} height={16} />
      </div>
      <div>
        <h6 className="text-2xl font-semibold">{value}</h6>
        <p className="text-sm font-normal">{title}</p>
      </div>
    </Link>
  );
}

export default function TotalAssets() {
  const { stats, documents } = useTenderWorkspace();
  const needsAttention = documents.filter((document) => document.status !== 'Valid').length;

  const assetsData = [
    {
      id: 'Matched',
      title: 'Discovered Tenders',
      href: '/tenders',
      value: stats.discovered,
      icon: SearchCheck,
    },
    {
      id: 'Applications',
      title: 'Active Applications',
      href: '/applications',
      value: stats.applications,
      icon: FileText,
    },
    {
      id: 'Documents',
      title: 'Documents Needing Attention',
      href: '/documents',
      value: needsAttention,
      icon: FileWarning,
    },
    {
      id: 'Won',
      title: 'Contracts Won',
      href: '/analytics',
      value: stats.won,
      icon: CheckCircle2,
    },
  ];

  return (
    <DashboardCard className="flex flex-col gap-0! pb-0!">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Layers3 size={16} className="text-muted-foreground" />
          Tender Workspace
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full! px-0!">
        <div className="h-full!">
          <div className="grid grid-cols-2 h-full! gap-px bg-border">
            {assetsData.map((item) => (
              <AssetCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
