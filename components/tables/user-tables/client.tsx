'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { contents, User, Users } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './user-data-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { getUserList } from '@/lib/services/userService';

interface ProductsClientProps {
  data: contents[];
}

// interface content {
//   content: []
//   page: number,
//   size: number,
//   totalElements: number,
//   totalPages: number
// }

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <>
      <div className='space-y-2 overflow-y-scroll'>
        <div className="flex items-start justify-between">
          <Heading
            title={`${t('TAG_USER')} (${data?.length})`}
            description={t('TAG_MANAGE_USERS')}
          />
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/user/userListing/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> {t('TAG_ADD_NEW')}
          </Button>
        </div>
        <div className='space-y-5 p-1'>
          <DataTable columns={columns} data={data ?? []} />
        </div>
      </div>
    </>
  );
};
