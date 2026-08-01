import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetClose,
} from "src/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { Icon } from "@iconify/react";
import { cn } from "src/lib/utils";
import { Building2, Mailbox } from 'lucide-react';
import { profileDD } from "./data";
import { Link } from "react-router";
import avatar from '@/assets/images/profile/avtar.webp';

export default function ProfileSheet() {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer hover:bg-primary/5 flex items-center justify-center rounded-full h-10 w-10">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} alt="Khensani Ndlozi" />
          <AvatarFallback>KN</AvatarFallback>
        </Avatar>
      </SheetTrigger>

      <SheetContent
        showCloseButton={false}
        side="right"
        className="border-s-0 w-full sm:max-w-80 max-w-60"
      >
        <SheetClose className="absolute top-5 end-5 p-2 hover:bg-primary/5 hover:text-primary rounded-full">
          <Icon icon="tabler:x" width={20} height={20} />
        </SheetClose>

        <div className="p-6 py-6">
          <div className="flex flex-col gap-4 justify-center items-center pt-10">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatar} alt="Khensani Ndlozi" width={30} height={30} />
              <AvatarFallback>KN</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h6 className="text-lg font-semibold">Khensani Ndlozi</h6>
              <p className="text-sm text-muted-foreground">Tender Manager</p>
              <div className="flex items-center gap-2 justify-center mt-1">
                <Mailbox size={18} className="text-muted-foreground" />
                <span className="text-sm font-normal text-muted-foreground">tenders@ubuntubuild.co.za</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <ul className="flex flex-col gap-2 p-6">
            {profileDD.map((item) => (
              <li key={item.title} className="group">
                <Link
                  to={item.href}
                  className={cn("flex gap-3 py-2 px-3 rounded-md group-hover:bg-primary/5 text-muted-foreground")}
                >
                  <item.avatar width={20} height={20} className="group-hover:text-primary" />
                  <div className="flex gap-3 items-center">
                    <h6 className="text-sm group-hover:text-primary">{item.title}</h6>
                    {item.badge && (
                      <span className="h-5 min-w-6 px-1 text-sm flex justify-center items-center text-primary rounded-sm bg-primary/5">
                        {item.title === 'Approvals' ? '4' : '2'}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <SheetFooter className="px-0 pb-6">
          <div className="border-t border-border w-full px-6 pt-6">
            <div className="rounded-lg border border-border p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="border border-border p-2 rounded-md">
                  <Building2 size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold">Ubuntu Build & Safety Ltd.</h5>
                  <p className="text-xs text-muted-foreground">Private enterprise installation</p>
                </div>
              </div>
              <Button
                variant="secondary"
                render={<Link to="/company-profile" />}
                className="text-primary w-full"
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
