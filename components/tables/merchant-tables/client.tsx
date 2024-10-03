'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Merchant } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './merchant-data-table';
import { useTranslations } from 'next-intl';

interface ProductsClientProps {
  data: Merchant[];
}

export const MerchantClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const t = useTranslations()
  return (
    <>
      <div className='overflow-y-scroll space-y-2'>
        <div className="flex items-start justify-between">
          <Heading
            title={`${t('TAG_MERCHANTS')} (${data.length})`}
            description={t('TAG_MANAGE_MERCHANTS')}
          />
          {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/userListing/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
        </div>
        {/* <Separator /> */}
        <div className='space-y-5'>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};
