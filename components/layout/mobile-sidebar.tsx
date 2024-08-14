'use client';
import { auth } from '@/auth';
import { DashboardNav } from '@/components/dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/constants/data';
import useNavItems from '@/hooks/useNavItems';
import { NavItem } from '@/types';
import { MenuIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const navItemsFiltered = useNavItems(navItems);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <DashboardNav items={navItemsFiltered} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
