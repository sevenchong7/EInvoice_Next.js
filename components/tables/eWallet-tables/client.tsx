'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useTranslations } from 'next-intl';
import { GetEwalletListParam } from '@/lib/interface/userInterface';
import { useEffect, useState } from 'react';
import { useDataTaskStore } from '@/lib/store/dataStore';
import { getEwalletBalance, getEWalletList } from '@/lib/services/userService';
import { ConfirmButton } from '@/components/ui/confirmButton';
import { DateTimePicker } from '@/components/ui/datetime';
import { DataTable } from './eWallet-data-table';
import { useSession } from 'next-auth/react';
import { useUserTaskStore } from '@/lib/store/userStore';

interface ProductsClientProps {
  data: GetEwalletListParam | undefined;
}

export const EwalletListClient: React.FC<ProductsClientProps> = ({ data }) => {
  const { data: session } = useSession()
  const router = useRouter();
  const t = useTranslations()
  const [selectedTitleChange, setSelectedTitleChange] = useState<any>()
  const [resetAllSelectedTitle, setResetAllSelectedTitle] = useState(false)
  const selectedTitle = useDataTaskStore((state) => state.merchantFilterData)
  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()
  const setEwalletBalance = useUserTaskStore((state) => state.setEWalletBalanceList)
  const eWalletBalance = useUserTaskStore((state) => state.eWalletBalanceList)

  useEffect(() => {
    setFromDate(new Date());
    setToDate(new Date());

    const GetEwalletBalance = async () => {
      const eWalletBalanceData = await getEwalletBalance(session?.user.merchantId)
      setEwalletBalance(eWalletBalanceData)
    }

    GetEwalletBalance()
    // console.log('data = ', data)
  }, []);

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

    const eWalletList = await getEWalletList(queryString);
    setSelectedTitleChange(eWalletList)
  }

  return (
    <>
      <div className='overflow-y-scroll space-y-2'>
        <div className="flex items-center  justify-between">
          {/* <div className='flex-1'>
            <Heading
              title={`${t('TAG_VIEW_STATEMENT')}`}
              // (${data?.content?.length})
              description={t('TAG_EWALLET_LIST')}
            />
          </div> */}
          <div>
            <h1 className='text-3xl font-semibold pt-2'>{t('TAG_EWALLET_TITLE')}</h1>
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
        <Separator />
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid grid-rows-none'>
            <div className='flex grid grid-cols-3 gap-4'>
              <p className='font-semibold col-span-2'>{t('TAG_BALANCE')}</p>
              <p className='font-semibold col-span-1'> RM {eWalletBalance.ewalletBalance}</p>
            </div>
            {/* <div className='flex grid grid-cols-3 gap-4'>
              <p className='font-semibold col-span-2'>{t('TAG_BEGINNING_BALANCE')} {fromDate?.toLocaleDateString()}</p>
              <p className='font-semibold col-span-1'>00.00 = RM { }</p>
            </div> */}
          </div>
        </div>
        <div className='space-y-5'>
          <DataTable
            columns={columns}
            data={selectedTitleChange ? selectedTitleChange.content : data?.content ?? []}
            totalPage={data ? data.totalPages : 0}
            currentPage={selectedTitleChange ? selectedTitleChange.page : data ? data.page : 0}
            usePageCallback={handleSelectedTitle}
            resetAllSelectedTitle={resetAllSelectedTitle}
          />
        </div>
        <Separator />
        <div className='grid grid-cols-5 gap-4'>
          <div className='grid grid-rows-none col-span-3 gap-4'>
            <h1 className='font-semibold'>* {t('TAG_LEGEND')} :</h1>
            <div className='grid grid-cols-2'>
              <div className='grid grid-rows-none gap-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>ADAI</h1>
                  <h1 className='col-span-2'>{t('TAG_ADJUSTMENT_IN')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>SALI</h1>
                  <h1 className='col-span-2'>{t('TAG_SALES_IN')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>TRFI</h1>
                  <h1 className='col-span-2'>{t('TAG_TRANSFER_IN')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>WDI</h1>
                  <h1 className='col-span-2'>{t('TAG_WITHDRAW_IN')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>TOPU</h1>
                  <h1 className='col-span-2'>{t('TAG_TOPUP_IN')}</h1>
                </div>
              </div>
              <div className='grid grid-rows-none gap-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>ADAO</h1>
                  <h1 className='col-span-2'>{t('TAG_ADJUSTMENT_OUT')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>SALO</h1>
                  <h1 className='col-span-2'>{t('TAG_SALES_OUT')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>TRFO</h1>
                  <h1 className='col-span-2'>{t('TAG_TRANSFER_OUT')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>WDO</h1>
                  <h1 className='col-span-2'>{t('TAG_WITHDRAW_OUT')}</h1>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <h1>TOPD</h1>
                  <h1 className='col-span-2'>{t('TAG_TOPUP_OUT')}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
