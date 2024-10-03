import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
  const t = useTranslations()
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground overflow-x-auto">
      <Link
        href={'/dashboard'}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {t('TAG_DASHBOARD')}
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h-4 w-4" />
          <Link
            href={item.link}
            className={cn(
              'font-medium',
              index === items.length - 1
                ? 'pointer-events-none text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
