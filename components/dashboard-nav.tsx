'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
  handleToggle: () => void
}

export function DashboardNav({ items, setOpen, isMobileNav = false, handleToggle }: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];

          if (item.children && item.children.length > 0)
            return (
              <Accordion key={index} type="single" collapsible value={isMinimized ? "" : undefined}>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className={cn(
                      'group items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={isMinimized ? handleToggle : undefined}
                  >
                    <span
                      className={cn(
                        'flex items-center'
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {/* <span>{item.title}</span> */}

                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {
                      item.children.map((childItem, childindex) => {
                        return childItem.href && (
                          <Link
                            key={childindex}
                            href={childItem.disabled ? '/' : childItem.href}
                            onClick={() => { if (setOpen) setOpen(false); }}
                          >
                            <span
                              className={cn(
                                'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                path === childItem.href ? 'bg-accent' : 'transparent',
                                childItem.disabled && 'cursor-not-allowed opacity-80'
                              )}
                            >
                              {/* <Icon className="mr-2 h-4 w-4" /> */}
                              {/* <span className='ml-[25px]'>{childItem.title}</span> */}
                              {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                <span className="ml-[25px] truncate">{childItem.title}</span>
                              ) : (
                                ''
                              )}
                            </span>
                          </Link>
                        )
                      })
                    }
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )

          return (
            item.href && (
              <Link
                key={index}
                href={item.disabled ? '/' : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    path === item.href ? 'bg-accent' : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {/* <span>{item.title}</span> */}
                  {isMobileNav || (!isMinimized && !isMobileNav) ? (
                    <span className="mr-2 truncate">{item.title}</span>
                  ) : (
                    ''
                  )}
                </span>
              </Link>
            )
          );
        })}
      </TooltipProvider>
    </nav >
  );
}
