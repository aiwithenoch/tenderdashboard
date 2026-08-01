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
    title: "Efua Boateng",
    subtitle: "Insurance certificate needs updating",
    time: "just now",
    badgeColor: "bg-destructive",
    isRead: false,
  },
  {
    avatar: user2,
    color: "bg-primary",
    title: "Ama Serwaa Mensah",
    subtitle: "A 94% Ghana opportunity match was found",
    time: "5 mins ago",
    badgeColor: "bg-primary",
    isRead: false,
  },
  {
    avatar: user3,
    color: "bg-secondary",
    title: "Thabo Mokoena",
    subtitle: "Pricing schedule is ready for approval",
    time: "10 mins ago",
    badgeColor: "bg-chart-2",
    isRead: false,
  },
  {
    avatar: user4,
    color: "bg-chart-2",
    title: "Kato Ssemanda",
    subtitle: "Uganda bid submission confirmed",
    time: "2 hours ago",
    badgeColor: "bg-chart-4",
    isRead: true,
  },
  {
    avatar: user5,
    color: "bg-chart-1",
    title: "Aline Uwimana",
    subtitle: "41 procurement notices were scanned today",
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
    subtitle: "Ama Serwaa Mensah confirmed a 94% PPE match",
    time: "Just now",
    isRead: false,
  },
  {
    icon: ShieldAlert,
    bgcolor: "bg-chart-1/10",
    color: 'text-chart-1',
    title: "Document Required",
    subtitle: "Efua Boateng requested an updated insurance certificate",
    time: "5 mins ago",
    isRead: false,
  },
  {
    icon: Clock3,
    bgcolor: "bg-chart-2/10",
    color: 'text-chart-2',
    title: "Deadline Approaching",
    subtitle: "Amina Njoroge flagged three tenders closing this week",
    time: "20 mins ago",
    isRead: false,
  },
  {
    icon: FileCheck2,
    bgcolor: "bg-primary/5",
    color: 'text-primary',
    title: "Bid Package Ready",
    subtitle: "Thabo Mokoena prepared the technical response for approval",
    time: "1 hour ago",
    isRead: false,
  },
  {
    icon: CheckCircle2,
    bgcolor: "bg-chart-5/10",
    color: 'text-chart-5',
    title: "Submission Confirmed",
    subtitle: "Kato Ssemanda submitted the safety workwear bid",
    time: "Today",
    isRead: true,
  },
  {
    icon: FileSearch,
    bgcolor: "bg-chart-1/10",
    color: 'text-chart-1',
    title: "Source Scan Complete",
    subtitle: "Aline Uwimana reviewed 41 notices and qualified 23",
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
