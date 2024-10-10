'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Role } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './role-data-table';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/left-accordion';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import React from 'react';

interface ProductsClientProps {
  data: Role[];
}

export const RoleClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const t = useTranslations()
  return (
    <>
      <div className='overflow-y-scroll space-y-2'>
        <div className="flex items-start justify-between">
          <Heading
            title={`${t('TAG_ROLES')} (${data.length})`}
            description={t('TAG_MANAGE_ROLES')}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="text-xs md:text-sm">
                <Plus className="mr-2 h-4 w-4" /> {t('TAG_ADD_NEW')}
              </Button>
            </SheetTrigger>
            {/* <AddRole /> */}
          </Sheet>

        </div>
        {/* <Separator /> */}
        <div className='space-y-5'>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

//Todo
// const AddRole = () => {
//   const [loading, setLoading] = useState(false);
//   const t = useTranslations()
//   const onConfirm = async () => { };
//   const [permissionListCheckboxState, setPermissionListCheckboxState] = useState<boolean[]>()
//   const [functionCheckboxState, setFunctionCheckboxState] = useState<boolean[][]>()
//   const [subFunctionCheckboxStates, setSubFuntionCheckboxStates] = useState<boolean[][][]>();
//   const [open, setOpen] = useState(false);
//   const [role, setRole] = useState('');
//   const [dashboardCheck, setDashboardCheck] = useState(false);
//   const [add, setAdd] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const [view, setView] = useState(false);
//   const [user, setUser] = useState(false);
//   const [merchant, setMerchant] = useState(false);
//   const [createMerchant, setCreatMerchant] = useState(false);
//   const [uploadDocument, setUploadDocument] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState(false);
//   const [userListing, setUserListing] = useState(false)
//   const [viewUser, setViewUser] = useState(false)
//   const [updateUser, setUpdateUser] = useState(false)
//   const [deleteUser, setDeleteUser] = useState(false)

//   return (
//     <>
//       <SheetContent className='md:min-w-[500px]'>
//         <ScrollArea className='h-full '>
//           <div className='pr-5'>
//             <SheetHeader>
//               <SheetTitle className='text-2xl'>{t('TAG_ADD_NEW_ROLE')}:</SheetTitle>
//             </SheetHeader>
//             <div className="">
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-5 items-center gap-4">
//                   <Label htmlFor="name" className='col-span-2' >
//                     {t('TAG_ROLE')}
//                   </Label>
//                   <Input id="name" value={role} placeholder={'role'} onChange={(e) => setRole(e.target.value)} className="col-span-3" />
//                 </div>
//               </div>

//               <div className="">
//                 <Label htmlFor="status">
//                   {t('TAG_ACCESS_CONTROL')}:
//                 </Label>
//                 <Separator />
//                 <Accordion type='multiple' defaultValue={['item-1', 'user', 'merchant', 'listing']}>
//                   <AccordionItem value="item-1" className='border-white pt-4' >
//                     <div className='flex flex-row items-center space-x-2'>
//                       <AccordionTrigger className='justify-start '></AccordionTrigger>
//                       <CustomeCheckBox id='dashboard' title={t('TAG_DASHBOARD')} checked={dashboardCheck} onCheckedChange={() => handleDashboardChange(!dashboardCheck)} />
//                     </div>
//                     <div className='pl-[50px] pt-2'>
//                       <AccordionContent>
//                         <CustomeCheckBox id='add' title={t('TAG_ADD')} checked={add} onCheckedChange={() => setAdd(!add)} />
//                       </AccordionContent>
//                       <AccordionContent>
//                         <CustomeCheckBox id='edit' title={t('TAG_EDIT')} checked={edit} onCheckedChange={() => setEdit(!edit)} />
//                       </AccordionContent>
//                       <AccordionContent>
//                         <CustomeCheckBox id='view' title={t('TAG_VIEW')} checked={view} onCheckedChange={() => setView(!view)} />
//                       </AccordionContent>
//                     </div>
//                   </AccordionItem>
//                   <AccordionItem value='user'>
//                     <div className='flex flex-row items-center space-x-2'>
//                       <AccordionTrigger className='justify-start'></AccordionTrigger>
//                       <CustomeCheckBox id='user' title={t('TAG_USER')} checked={user} onCheckedChange={() => handleUser(!user)} />
//                     </div>
//                     <div className='pt-2 pl-[50px]'>
//                       <AccordionContent >
//                         <AccordionItem value='merchant'>
//                           <div className='flex flex-row items-center space-x-2'>
//                             <AccordionTrigger className='justify-start'></AccordionTrigger>
//                             <CustomeCheckBox id='merchant' title={t('TAG_MERCHANT')} checked={merchant} onCheckedChange={() => handleMerchant(!merchant)} />
//                           </div>
//                           <div className='pl-[50px] pt-2'>
//                             <AccordionContent >
//                               <CustomeCheckBox id='createMerchant' title={t('TAG_CREATE_MERCHANT')} checked={createMerchant} onCheckedChange={() => setCreatMerchant(!createMerchant)} />
//                             </AccordionContent>
//                             <AccordionContent>
//                               <CustomeCheckBox id='uploadDocument' title={t('TAG_UPLOAD_DOCUMENT')} checked={uploadDocument} onCheckedChange={() => setUploadDocument(!uploadDocument)} />
//                             </AccordionContent>
//                             <AccordionContent>
//                               <CustomeCheckBox id='paymentMethod' title={t('TAG_MULTI_PAYMENT_METHOD')} checked={paymentMethod} onCheckedChange={() => setPaymentMethod(!paymentMethod)} />
//                             </AccordionContent>
//                           </div>
//                         </AccordionItem>
//                       </AccordionContent>
//                       <AccordionContent>
//                         <AccordionItem value='listing'>
//                           <div className='flex flex-row items-center space-x-2'>
//                             <AccordionTrigger className='justify-start'></AccordionTrigger>
//                             <CustomeCheckBox id='userListing' title={t('TAG_USER_LISTING')} checked={userListing} onCheckedChange={() => handleUserListing(!userListing)} />
//                           </div>
//                           <div className='pl-[50px] pt-2'>
//                             <AccordionContent>
//                               <CustomeCheckBox id='viewUser' title={t('TAG_VIEW_USER')} checked={viewUser} onCheckedChange={() => setViewUser(!viewUser)} />
//                             </AccordionContent>
//                             <AccordionContent>
//                               <CustomeCheckBox id='updateUser' title={t('TAG_UPDATE_USER_INFO')} checked={updateUser} onCheckedChange={() => setUpdateUser(!updateUser)} />
//                             </AccordionContent>
//                             <AccordionContent>
//                               <CustomeCheckBox id='deleteUser' title={t('TAG_DELETE_USER')} checked={deleteUser} onCheckedChange={() => setDeleteUser(!deleteUser)} />
//                             </AccordionContent>
//                           </div>
//                         </AccordionItem>
//                       </AccordionContent>
//                     </div>
//                   </AccordionItem>
//                 </Accordion>
//               </div>
//             </div>
//             <SheetFooter>
//               {/* <SheetClose asChild> */}
//               <Button type="submit" className='bg-blue-800 hover:bg-blue-700' onClick={() => { setOpen(true) }}>{t('TAG_CONFIRM')}</Button>
//               {/* </SheetClose> */}
//             </SheetFooter>
//           </div>
//           <ScrollBar />
//         </ScrollArea>
//       </SheetContent>
//     </>
//   )
// }
