import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

export function NavSecondary() {
  return (
    <div className="-mx-4 border-t border-b border-border px-5 py-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 shrink-0" />
                <span className="font-medium text-base leading-6 text-foreground">Compliance Ready</span>
              </div>
              <span className="font-medium text-base leading-6 text-foreground">86%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full w-[86%] bg-foreground rounded-full" />
            </div>
          </div>
          <p className="text-sm font-normal leading-5 text-muted-foreground text-center">
            6 of 7 required documents ready
          </p>
        </div>
        <Link to="/documents" className="w-full cursor-pointer h-9 flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 rounded-lg text-sm font-medium">
          Review documents
        </Link>
      </div>
    </div>
  );
}
