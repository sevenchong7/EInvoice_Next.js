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
import { ConfirmButton } from '@/components/ui/confirmButton';
import { useDataTaskStore } from '@/lib/store/dataStore';
import { GetUserListParam } from '@/lib/interface/userInterface';

interface ProductsClientProps {
  data: GetUserListParam | undefined;
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
  const [selectedTitleChange, setSelectedTitleChange] = useState<any>()
  const [resetAllSelectedTitle, setResetAllSelectedTitle] = useState(false)
  const selectedTitle = useDataTaskStore((state) => state.userFilterData)

  const handleSelectedTitle = async (page?: number) => {
    const params = new URLSearchParams();

    if (page != data?.page && page) {
      params.append('page', page.toString());
    }

    selectedTitle.forEach(({ key, value }) => {
      if (value) {
        params.append(key, value);
      }
    });

    const queryString = params.toString();

    // console.log("User queryString = ", queryString)

    const merchantList = await getUserList(queryString);
    setSelectedTitleChange(merchantList)
  }

  return (
    <>
      <div className='space-y-2 overflow-y-scroll'>
        <div className="flex items-start justify-between">
          <Heading
            title={`${t('TAG_USER')} (${data?.content?.length})`}
            description={t('TAG_MANAGE_USERS')}
          />
          {/* <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/user/userListing/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> {t('TAG_ADD_NEW')}
          </Button> */}
          <div className='space-x-4'>
            <ConfirmButton onClick={() => { handleSelectedTitle() }}>
              {t('TAG_CONFIRM')}
            </ConfirmButton>
            <Button onClick={() => { setResetAllSelectedTitle(!resetAllSelectedTitle) }}>
              {t('TAG_RESET')}
            </Button>
          </div>
        </div>
        <div className='space-y-5 p-1'>
          <DataTable
            columns={columns}
            data={selectedTitleChange ? selectedTitleChange.content : data?.content ?? []}
            totalPage={data ? data.totalPages : 0}
            currentPage={selectedTitleChange ? selectedTitleChange.page : data ? data.page : 0}
            usePageCallback={handleSelectedTitle}
            resetAllSelectedTitle={resetAllSelectedTitle}
          />
        </div>
      </div>
    </>
  );
};
