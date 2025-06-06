'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { MerchantContent, Role, RoleInfo } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './role-data-table';
import {
  Sheet,
} from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import React from 'react';
import AddRole from './addRole';
import PermissionCheck from '@/components/permission-check';
import useHasAccess from '@/hooks/useHasAccess';
import { ConfirmModal } from '@/components/modal/confirm-moal';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDefaultPermission, getMerchantList, getRoles } from '@/lib/services/userService';
import { useSession } from 'next-auth/react';
import { GetRoleListParam } from '@/lib/interface/userInterface';
import { useDataTaskStore } from '@/lib/store/dataStore';
import { ConfirmButton } from '@/components/ui/confirmButton';

interface ProductsClientProps {
  roleData: GetRoleListParam | undefined;
  // merchantData: MerchantContent[];
}

export const RoleClient: React.FC<ProductsClientProps> = ({ roleData }) => {
  const router = useRouter();
  const t = useTranslations();
  const hasAccess = useHasAccess('roleList.su.create');
  const [open, setOpen] = useState(false)
  const [selectUserModal, setSelectUserModal] = useState(false)
  const [radioValueSelection, setRadioValueSelection] = useState<string>('')
  const [merchantSelect, setMerchantSelect] = useState<string>()
  const [permissionList, setPermissionList] = useState<any>()
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const [mId, setMId] = useState<any>()
  const [merchantList, setMerchantList] = useState<MerchantContent[]>([])
  const [selectedTitleChange, setSelectedTitleChange] = useState<any>()
  const [resetAllSelectedTitle, setResetAllSelectedTitle] = useState(false)
  const selectedTitle = useDataTaskStore((state) => state.roleFilterData)



  useEffect(() => {
    const getMerchantListData = async () => {
      const merchantData = await getMerchantList()
      setMerchantList(merchantData.content)
    }

    if (hasAccess) {
      getMerchantListData()
    }
  }, [])

  const HandlePermission = () => {
    if (!hasAccess) {
      //call API
      const getPermission = getDefaultPermission(session.data?.user.merchantId)
      setLoading(true)
      getPermission.then((res) => {
        setLoading(false)
        setMId(session.data?.user.merchantId)
        setPermissionList(res)
        setOpen(true)
      })

      // setOpen(true)
    } else {
      // GetMerchantList()
      setRadioValueSelection('')
      setOpen(false)
      setSelectUserModal(true)
    }

  }

  const HandleSubmit = () => {
    if (radioValueSelection == 'merchant') {
      const getPermission = getDefaultPermission(merchantSelect)
      setLoading(true)
      getPermission.then((res) => {
        setLoading(false)
        setMId(merchantSelect)
        setPermissionList(res)
        setOpen(true)
      })
    } else if (radioValueSelection == 'superAdmin') {
      const getPermission = getDefaultPermission(session.data?.user.merchantId)
      setLoading(true)
      getPermission.then((res) => {
        setLoading(false)
        setMId(session.data?.user.merchantId)
        setPermissionList(res)
        setOpen(true)

      })
    }

  }


  const handleSelectedTitle = async (page?: number) => {
    const params = new URLSearchParams();

    if (page != roleData?.page && page) {
      params.append('page', page.toString());
    }

    selectedTitle.forEach(({ key, value }) => {
      if (value) {
        params.append(key, value);
      }
    });

    const queryString = params.toString();

    // console.log("queryString = ", queryString)

    const merchantList = await getRoles(queryString);
    setSelectedTitleChange(merchantList)
  }

  return (
    <>
      <ConfirmModal
        isOpen={selectUserModal}
        onClose={() => setSelectUserModal(false)}
        onConfirm={() => HandleSubmit()}
        loading={loading}
        title='Action Needed : Complete Required Field'
        content={
          <>
            <div className='space-y-5'>
              <div className='flex w-full justify-between items-center px-12 '>
                <p className='text-nowrap'>Add for:</p>
                <RadioGroup className='flex w-full justify-around' onValueChange={(value) => setRadioValueSelection(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="superAdmin" id="superAdmin" />
                    <Label htmlFor="superAdmin">Super Admin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="merchant" id="merchant" />
                    <Label htmlFor="merchant">Merchant</Label>
                  </div>
                </RadioGroup>
              </div>
              {
                radioValueSelection === 'merchant' &&
                <div className='flex w-full justify-between items-center px-12 space-x-5'>
                  <p className='text-nowrap'>Merchant :</p>
                  <Select
                    onValueChange={(value) => setMerchantSelect(value)}
                    value={merchantSelect}>
                    <SelectTrigger>
                      <SelectValue
                        // defaultValue={field.value}
                        placeholder="Select a Merchant"
                      />
                    </SelectTrigger>
                    <SelectContent className='max-h-[300px] overflow-y-scroll'>
                      {/* @ts-ignore  */}
                      {
                        merchantList?.map((merchantData: any, index: number) => (
                          <SelectItem key={index} value={merchantData.merchantId}>
                            {merchantData.companyName}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              }
            </div>
          </>
        }
      />
      <div className='overflow-y-scroll space-y-2'>
        <div className="flex items-start justify-between">
          <Heading
            title={`${t('TAG_ROLES')} (${roleData?.content?.length})`}
            description={t('TAG_MANAGE_ROLES')}
          />
          <div className='space-x-4'>
            <ConfirmButton onClick={() => { handleSelectedTitle() }}>
              {t('TAG_CONFIRM')}
            </ConfirmButton>
            <Button onClick={() => { setResetAllSelectedTitle(!resetAllSelectedTitle) }}>
              {t('TAG_RESET')}
            </Button>
          </div>
          {/* <Sheet open={open} onOpenChange={setOpen}>

            <Button
              onClick={() => HandlePermission()}
              className="text-xs md:text-sm"
              disabled={loading}
            >
              <Plus className="mr-2 h-4 w-4" /> {t('TAG_ADD_NEW')}
            </Button>
            <AddRole openSheet={open} permissionListData={permissionList} setOpen={setOpen} setSelectUserModal={setSelectUserModal} mId={mId} />
          </Sheet> */}
        </div>
        {/* <Separator /> */}
        <div className='space-y-5'>
          <DataTable
            columns={columns}
            data={selectedTitleChange ? selectedTitleChange.content : roleData?.content ?? []}
            totalPage={roleData ? roleData.totalPages : 0}
            currentPage={selectedTitleChange ? selectedTitleChange.page : roleData ? roleData.page : 0}
            usePageCallback={handleSelectedTitle}
            resetAllSelectedTitle={resetAllSelectedTitle}
            open={open}
            setOpen={setOpen}
            permissionList={permissionList}
            setSelectUserModal={setSelectUserModal}
            HandlePermission={HandlePermission}
            mId={mId}
          />
        </div>
      </div>
    </>
  );
};
