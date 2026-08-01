import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetClose,
} from 'src/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from 'src/components/ui/avatar';
import { Button } from 'src/components/ui/button';
import { Icon } from '@iconify/react';
import { cn } from 'src/lib/utils';
import { Building2, Mailbox } from 'lucide-react';
import { profileDD } from './data';
import { Link } from 'react-router';
import avatar from '@/assets/images/profile/avtar.webp';
import { useTenderWorkspace } from '@/context/tender/TenderWorkspaceContext';

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return initials || 'AM';
}

export default function ProfileSheet() {
  const { profile, stats, documents } = useTenderWorkspace();
  const initials = getInitials(profile.contactName);
  const documentAlerts = documents.filter((document) => document.status !== 'Valid').length;

  const getBadgeValue = (title: string) => {
    if (title === 'Approvals') return stats.approvals;
    if (title === 'Document Vault') return documentAlerts;
    return 0;
  };

  return (
    <Sheet>
      <SheetTrigger className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/5">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} alt={profile.contactName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </SheetTrigger>

      <SheetContent
        showCloseButton={false}
        side="right"
        className="w-full max-w-[20rem] border-s-0 p-0 sm:max-w-80"
      >
        <SheetClose className="absolute end-5 top-5 z-10 rounded-full p-2 hover:bg-primary/5 hover:text-primary">
          <Icon icon="tabler:x" width={20} height={20} />
        </SheetClose>

        <div className="px-6 pb-6 pt-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={avatar}
                alt={profile.contactName}
                width={64}
                height={64}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="w-full text-center">
              <h6 className="text-lg font-semibold">{profile.contactName}</h6>
              <p className="text-sm text-muted-foreground">Tender Manager</p>
              <div className="mt-1 flex items-start justify-center gap-2">
                <Mailbox size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                <span className="break-all text-sm font-normal text-muted-foreground">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <ul className="flex flex-col gap-2 p-6">
            {profileDD.map((item) => {
              const badgeValue = getBadgeValue(item.title);

              return (
                <li key={item.title} className="group">
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground group-hover:bg-primary/5',
                    )}
                  >
                    <item.avatar
                      width={20}
                      height={20}
                      className="shrink-0 group-hover:text-primary"
                    />
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                      <h6 className="truncate text-sm group-hover:text-primary">
                        {item.title}
                      </h6>
                      {item.badge && badgeValue > 0 && (
                        <span className="flex h-5 min-w-6 shrink-0 items-center justify-center rounded-sm bg-primary/5 px-1 text-sm text-primary">
                          {badgeValue}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <SheetFooter className="px-0 pb-6">
          <div className="w-full border-t border-border px-6 pt-6">
            <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="shrink-0 rounded-md border border-border p-2">
                  <Building2 size={18} />
                </div>
                <div className="min-w-0">
                  <h5 className="truncate text-sm font-semibold">{profile.companyName}</h5>
                  <p className="text-xs text-muted-foreground">Private enterprise installation</p>
                </div>
              </div>
              <Button
                variant="secondary"
                render={<Link to="/company-profile" />}
                className="w-full text-primary"
              >
                View Company Profile
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
