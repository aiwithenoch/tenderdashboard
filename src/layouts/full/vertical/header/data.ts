interface MessageType {
  title: string;
  avatar: string;
  subtitle: string;
  color: string;
  time: string;
  badgeColor: string;
  isRead?: boolean;
}

import user1 from "@/assets/images/profile/user-1.png";
import user2 from "@/assets/images/profile/user-2.png";
import user3 from "@/assets/images/profile/user-3.png";
import user4 from "@/assets/images/profile/user-4.png";
import user5 from "@/assets/images/profile/user-5.png";

const MessagesLink: MessageType[] = [
  {
    avatar: user1,
    color: "bg-destructive",
    title: "Compliance Team",
    subtitle: "Insurance certificate needs updating",
    time: "just now",
    badgeColor: "bg-destructive",
    isRead: false,
  },
  {
    avatar: user2,
    color: "bg-primary",
    title: "Tender Analyst",
    subtitle: "A 94% opportunity match was found",
    time: "5 mins ago",
    badgeColor: "bg-primary",
    isRead: false,
  },
  {
    avatar: user3,
    color: "bg-secondary",
    title: "Finance Review",
    subtitle: "Pricing schedule is ready for approval",
    time: "10 mins ago",
    badgeColor: "bg-chart-2",
    isRead: false,
  },
  {
    avatar: user4,
    color: "bg-chart-2",
    title: "Submission Desk",
    subtitle: "Uganda bid submission confirmed",
    time: "2 hours ago",
    badgeColor: "bg-chart-4",
    isRead: true,
  },
  {
    avatar: user5,
    color: "bg-chart-1",
    title: "Tender Sources",
    subtitle: "41 notices were scanned today",
    time: "today",
    badgeColor: "bg-chart-2",
    isRead: true,
  },
];

import {
  BellRing,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileSearch,
  LucideIcon,
  ShieldAlert,
  Building2,
  FolderLock,
  Home,
  Settings,
  UserCheck,
} from 'lucide-react';

interface NotificationType {
  title: string;
  icon: LucideIcon;
  subtitle: string;
  bgcolor: string;
  color: string;
  time: string;
  isRead?: boolean;
}

const Notification: NotificationType[] = [
  {
    icon: BellRing,
    bgcolor: "bg-chart-4/10",
    color: 'text-chart-4',
    title: "New Tender Match",
    subtitle: "PPE supply opportunity matched at 94%",
    time: "Just now",
    isRead: false,
  },
  {
    icon: ShieldAlert,
    bgcolor: "bg-chart-1/10",
    color: 'text-chart-1',
    title: "Document Required",
    subtitle: "Upload the updated insurance certificate",
    time: "5 mins ago",
    isRead: false,
  },
  {
    icon: Clock3,
    bgcolor: "bg-chart-2/10",
    color: 'text-chart-2',
    title: "Deadline Approaching",
    subtitle: "Three qualified tenders close this week",
    time: "20 mins ago",
    isRead: false,
  },
  {
    icon: FileCheck2,
    bgcolor: "bg-primary/5",
    color: 'text-primary',
    title: "Bid Package Ready",
    subtitle: "Technical response is ready for approval",
    time: "1 hour ago",
    isRead: false,
  },
  {
    icon: CheckCircle2,
    bgcolor: "bg-chart-5/10",
    color: 'text-chart-5',
    title: "Submission Confirmed",
    subtitle: "Safety workwear bid was submitted successfully",
    time: "Today",
    isRead: true,
  },
  {
    icon: FileSearch,
    bgcolor: "bg-chart-1/10",
    color: 'text-chart-1',
    title: "Source Scan Complete",
    subtitle: "41 notices reviewed and 23 qualified",
    time: "Today",
    isRead: true,
  },
];

interface profileType {
  avatar: LucideIcon;
  title: string;
  href: string;
  badge: boolean;
}

const profileDD: profileType[] = [
  {
    avatar: Home,
    title: 'Dashboard',
    href: '/',
    badge: false,
  },
  {
    avatar: Building2,
    title: 'Company Profile',
    href: '/company-profile',
    badge: false,
  },
  {
    avatar: FolderLock,
    title: 'Document Vault',
    href: '/documents',
    badge: true,
  },
  {
    avatar: UserCheck,
    title: 'Approvals',
    href: '/approvals',
    badge: true,
  },
  {
    avatar: Settings,
    title: 'System Settings',
    href: '/settings',
    badge: false,
  },
];

export {
  MessagesLink,
  Notification,
  profileDD,
};
