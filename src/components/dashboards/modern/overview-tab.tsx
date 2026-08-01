'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays, RefreshCcw, ScanSearch, Sun, Moon } from 'lucide-react';
import { useTenderWorkspace } from '@/context/tender/TenderWorkspaceContext';

const dropdownItems = ['This Month', 'This Quarter'];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

export default function OverviewTab() {
  const { profile, runScan } = useTenderWorkspace();
  const [greeting] = useState(getGreeting);
  const [scanStatus, setScanStatus] = useState(
    'Your tender intelligence workspace is monitoring new opportunities',
  );
  const [selectedPeriod, setSelectedPeriod] = useState(dropdownItems[0]);
  const firstName = profile.contactName.trim().split(/\s+/)[0] || 'Ama';

  const GreetingIcon =
    greeting === 'Good Morning' || greeting === 'Good Afternoon' ? Sun : Moon;

  const handleScan = () => {
    const tender = runScan();
    setScanStatus(
      `${tender.id} is available in Rwanda with a ${tender.match}% qualification score`,
    );
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h2 className="flex flex-wrap items-center gap-2 text-xl">
          <span>
            {greeting}, {firstName}
          </span>
          <GreetingIcon size={22} className="shrink-0 text-muted-foreground" />
        </h2>
        <p className="mt-1 text-sm font-normal text-muted-foreground">{scanStatus}</p>
      </div>

      <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:flex-nowrap">
        <Button
          variant="outline"
          className="h-9 w-9 shrink-0 rounded-lg p-0"
          aria-label="Refresh tender data"
          onClick={handleScan}
        >
          <RefreshCcw size={16} />
        </Button>

        <Select
          value={selectedPeriod}
          onValueChange={(value) => value && setSelectedPeriod(value)}
        >
          <SelectTrigger className="h-9 min-w-36 flex-1 cursor-pointer text-foreground sm:flex-none">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {dropdownItems.map((item) => (
              <SelectItem className="cursor-pointer" key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="h-9 flex-1 gap-1.5 rounded-lg px-4 sm:flex-none"
          onClick={handleScan}
        >
          <ScanSearch size={16} />
          <span className="text-sm font-medium">Run Tender Scan</span>
        </Button>
      </div>
    </div>
  );
}
