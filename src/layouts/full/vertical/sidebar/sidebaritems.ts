export interface ChildItem {
  id?: number | string;
  name: string;
  icon?: LucideIcon;
  items?: ChildItem[];
  item?: unknown;
  url?: string;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  badgeContent?: string;
  isActive?: boolean;
  external?: boolean;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: LucideIcon;
  id?: number;
  to?: string;
  item?: MenuItem[];
  items?: ChildItem[];
  url?: string;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  badgeContent?: string;
  isActive?: boolean;
  isPro?: boolean;
}

import { uniqueId } from "lodash";
import {
  BarChart3,
  Building2,
  CheckSquare,
  FileCheck2,
  FileSearch,
  FileText,
  FolderLock,
  House,
  LucideIcon,
  Send,
  Settings,
} from "lucide-react";

const SidebarContent: MenuItem[] = [
  {
    heading: "Tender Workspace",
    items: [
      {
        id: uniqueId(),
        name: "Dashboard",
        icon: House,
        url: "/",
      },
      {
        id: uniqueId(),
        name: "Tender Discovery",
        icon: FileSearch,
        url: "/tenders",
      },
      {
        id: uniqueId(),
        name: "Applications",
        icon: FileText,
        url: "/applications",
        badge: true,
        badgeContent: "8",
      },
      {
        id: uniqueId(),
        name: "Approvals",
        icon: CheckSquare,
        url: "/approvals",
        badge: true,
        badgeContent: "4",
      },
      {
        id: uniqueId(),
        name: "Submitted Bids",
        icon: Send,
        url: "/submissions",
      },
    ],
  },
  {
    heading: "Company",
    items: [
      {
        id: uniqueId(),
        name: "Document Vault",
        icon: FolderLock,
        url: "/documents",
        badge: true,
        badgeContent: "2",
      },
      {
        id: uniqueId(),
        name: "Company Profile",
        icon: Building2,
        url: "/company-profile",
      },
      {
        id: uniqueId(),
        name: "Analytics",
        icon: BarChart3,
        url: "/analytics",
      },
      {
        id: uniqueId(),
        name: "Settings",
        icon: Settings,
        url: "/settings",
      },
      {
        id: uniqueId(),
        name: "Compliance Review",
        icon: FileCheck2,
        url: "/documents",
      },
    ],
  },
];

export default SidebarContent;
