'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
type CompProps = {};
export default function ThemeToggle({ }: CompProps) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations()

  const HandleTheme = (selectTheme: string) => {
    setTheme(selectTheme)
    localStorage.setItem('theme', selectTheme)

    // console.log('[ThemeToggle] HandleTheme = ', selectTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('TAG_TOGGLE_THEME')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => HandleTheme('light')}>
          {t('TAG_LIGHT')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => HandleTheme('dark')}>
          {t('TAG_DARK')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => HandleTheme('system')}>
          {t('TAG_SYSTEM')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
