import { Link } from "react-router";
import { FileCheck2 } from "lucide-react";

const FullLogo = () => {
  return (
    <Link to="/" className="max-w-[40px] block lg:max-w-[120px] overflow-hidden">
      <div className="flex w-[120px] items-center gap-2">
        <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-foreground text-background">
          <FileCheck2 size={16} />
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground whitespace-nowrap">TenderPilot</span>
      </div>
    </Link>
  );
};

export default FullLogo;
