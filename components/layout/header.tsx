import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { MerchantSelection } from './merchant';
import LanguageSelection from './language';
import LocaleSwitcher from '../ui/localesSwitch';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">

        <div className='flex space-x-5 items-center'>
          <div className={cn('block lg:!hidden md:!hidden')}>
            <MobileSidebar />
          </div>
          <div className="flex items-center ">
            <MerchantSelection />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
