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

interface ProductsClientProps {
  data: MerchantContent[];
}

export const SubscriptionListClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const t = useTranslations()

  return (
    <>
      <div className='overflow-y-scroll space-y-2'>
        <div className="flex items-start justify-between">
          <Heading
            title={`${t('TAG_SUBSCRIPTION_LIST')} (${data?.length})`}
            description={t('TAG_MANAGE_SUBSCRIPTION_LIST')}
          />
        </div>
        {/* <Separator /> */}
        <div className='space-y-5'>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};
