'use client'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardCard } from '../../shared/dashboard-card';
import { CheckCircle2, FileText, FolderWarning, Layers3, SearchCheck } from 'lucide-react';

const assetsData = [
  {
    id: 'Matched',
    title: 'Matched Tenders',
    href: '/tenders',
    value: '23',
    icon: SearchCheck,
  },
  {
    id: 'Applications',
    title: 'Active Applications',
    href: '/applications',
    value: '8',
    icon: FileText,
  },
  {
    id: 'Documents',
    title: 'Missing Documents',
    href: '/documents',
    value: '2',
    icon: FolderWarning,
  },
  {
    id: 'Won',
    title: 'Contracts Won',
    href: '/analytics',
    value: '3',
    icon: CheckCircle2,
  },
];

type AssetCardProps = {
  title: string;
  href: string;
  value: string | number;
  icon: React.ElementType;
};

function AssetCard({ title, value, icon: Icon }: AssetCardProps) {
  return (
    <div className="flex flex-col justify-between p-6 bg-background">
      <div className="border border-border rounded-md p-2 w-fit">
        <Icon width={16} height={16} />
      </div>
      <div>
        <h6 className="text-2xl font-semibold">{value}</h6>
        <p className="text-sm font-normal">{title}</p>
      </div>
    </div>
  );
}

export default function TotalAssets() {
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
