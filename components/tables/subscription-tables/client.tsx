'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Merchant, MerchantContent } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './subscriptionList-data-table';
import { useTranslations } from 'next-intl';
import { GetMerchantListParam, GetSubscriptionListingParam } from '@/lib/interface/userInterface';
import { useState } from 'react';
import { useDataTaskStore } from '@/lib/store/dataStore';
import { getSubscriptionList } from '@/lib/services/userService';
import { ConfirmButton } from '@/components/ui/confirmButton';

interface ProductsClientProps {
  data: GetSubscriptionListingParam | undefined;
}

export const SubscriptionListClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const t = useTranslations()
  const [selectedTitleChange, setSelectedTitleChange] = useState<any>()
  const [resetAllSelectedTitle, setResetAllSelectedTitle] = useState(false)
  const selectedTitle = useDataTaskStore((state) => state.merchantFilterData)

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

    // console.log("queryString = ", queryString)

    const subList = await getSubscriptionList(queryString);
    setSelectedTitleChange(subList)
  }

  return (
    <>
      <div className='overflow-y-scroll space-y-2'>
        <div className="flex items-start justify-between">
          <div className='flex-1'>
            <Heading
              title={`${t('TAG_SUBSCRIPTION_LIST')} (${data?.content?.length})`}
              description={t('TAG_MANAGE_SUBSCRIPTION_LIST')}
            />
          </div>
          <div className='space-x-4'>
            <ConfirmButton onClick={() => { handleSelectedTitle() }}>
              {t('TAG_CONFIRM')}
            </ConfirmButton>
            <Button onClick={() => { setResetAllSelectedTitle(!resetAllSelectedTitle) }}>
              {t('TAG_RESET')}
            </Button>
          </div>
        </div>
        {/* <Separator /> */}
        <div className='space-y-5'>
          <DataTable
            columns={columns}
            data={selectedTitleChange ? selectedTitleChange.content : data?.content ?? []}
            totalPage={data ? data.totalPages : 0}
            currentPage={selectedTitleChange ? selectedTitleChange.page : data ? data.page : 0}
            usePageCallback={handleSelectedTitle}
            resetAllSelectedTitle={resetAllSelectedTitle} />
        </div>
      </div>
    </>
  );
};
