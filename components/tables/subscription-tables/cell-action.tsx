'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/left-accordion"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
import { CountryList, Merchant, MerchantContent, MerchantInfo, StateList, User } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Required from '@/components/ui/required';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCountry } from '@/lib/services/generalService';
import { useToast } from '@/components/ui/use-toast';
import { ConfirmButton } from '@/components/ui/confirmButton';

interface CellActionProps {
  data: MerchantContent;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [effect, setEffect] = useState(false);
  const t = useTranslations()
  // const router = useRouter();
  // router.push(`/dashboard/user/userListing/${data.id}`)
  const onConfirm = async () => {

  };

  return (
    <>
      <AlertModal
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfirm={onConfirm}
        loading={loading}
        title={`${t('TAG_DELETE_USER_MODAL_TITLE')}?`}
        description={t('TAG_DELETE_USER_MODAL_DESC')}
      />
      <div className='flex flex-row space-x-5'>
        {/* <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className='border-2 border-blue-800 text-blue-800 rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
            </button>
          </SheetTrigger>
          <EditUser data={data} open={open} setOpen={setOpen} />
        </Sheet> */}

        <button onClick={() => setOpenAlert(true)} className='border-2 border-black dark:border-white rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-gray-500'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
        </button>
      </div>
    </>
  );
};


// const EditUser = ({ data, open, setOpen }: { data: MerchantContent, open: boolean, setOpen: any }) => {
//   const t = useTranslations();
//   const { toast } = useToast();
//   const router = useRouter();
//   const [username, setUsername] = useState(data.loginId)
//   const [companyEmail, setCompanyEmail] = useState(data.email);
//   const [companyName, setCompanyName] = useState(data.companyName);
//   const [regNo, setRegNo] = useState(data.registrationNo);
//   const [tinNo, setTinNo] = useState(data.businessTinNo);
//   const [sstNo, setSSTNo] = useState(data.sstRegNo);
//   const [tourNo, setTourNo] = useState(data.tourRegNo);
//   const [streetAddress, setStreetAddress] = useState(data.address);
//   const [zipCode, setZipCode] = useState(data.postcode);
//   const [townCity, setTownCity] = useState(data.city);
//   const [state, setState] = useState(data.stateId);
//   const [country, setCountry] = useState(data.country);
//   const [contactNo, setContactNo] = useState(data.contact);
//   const [contactPrefix, setContactPrfix] = useState(data.contactPrefix);
//   const [status, setStatus] = useState(data.status);
//   const [textVisible, setTextVisible] = useState(true);
//   const [disableValidate, setDisableValidate] = useState(true);
//   const [countryList, setCountryList] = useState<CountryList[]>()
//   const [stateList, setStateList] = useState<StateList[]>()


//   useEffect(() => {
//     if (open) {
//       const GetCountryList = async () => {
//         return await getCountry();
//       }
//       GetCountryList().then((res) => setCountryList(res));
//     }
//   }, [open])

//   useEffect(() => {
//     if (open) {
//       countryList?.map((value) => {
//         if (value.countryCode === data.country) {
//           setStateList(value.stateList)
//           setContactPrfix(value.contactPrefix)
//         }
//       })
//     }
//   }, [open, countryList])

//   useEffect(() => {
//     if (open) {
//       countryList?.map((value) => {
//         if (value.countryCode === country) {
//           setStateList(value.stateList)
//           setContactPrfix(value.contactPrefix)
//         }
//       })
//     }
//   }, [open, country])

//   useEffect(() => {
//     if (open) {
//       setStatus(data.status)
//       setCountry(data.country)
//     }
//   }, [open])

//   const HandleStatus = () => {
//     if (status == 'ACTIVE') {
//       setStatus('DISABLE')
//     } else {
//       setStatus('ACTIVE')
//     }

//     setTextVisible(false);

//     setTimeout(() => {
//       setTextVisible(true);
//     }, 300);

//   }

//   useEffect(() => {
//     if (open) {
//       if (regNo != data.registrationNo || tinNo != data.businessTinNo) {
//         setDisableValidate(false);
//       }
//     }
//   }, [open, regNo, tinNo])

//   const HandleConfirm = () => {
//     const editMerchantParam = {
//       "companyName": companyName,
//       "companyEmail": companyEmail,
//       "registrationNo": regNo,
//       "busTinNo": tinNo,
//       "sstRegNo": sstNo,
//       "tourRegNo": tourNo,
//       "streetAddress": streetAddress,
//       "postCode": zipCode,
//       "city": townCity,
//       "state": state,
//       "country": country,
//       "contactPrefix": contactPrefix,
//       "contact": contactNo
//     }

//     const control = editMerchantInfo(data.merchantId, editMerchantParam)

//     control.then(() => {
//       setOpen(false)
//       toast({
//         title: "Success",
//         description: "Merchant has been edit successfully!",
//       });
//       router.refresh()
//     })
//   }

//   return (
//     <SheetContent className='md:min-w-[500px]'>
//       <ScrollArea className='h-full ' onWheel={(e) => {
//         e.stopPropagation();
//       }}>
//         <div className='pr-5'>
//           <SheetHeader>
//             <SheetTitle className='text-2xl'>{t('TAG_EDIT_USER_INFORMATION')}</SheetTitle>
//           </SheetHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-5 items-center gap-4">
//               <Label htmlFor="name" className='col-span-2' >
//                 {t('TAG_NAME')}
//               </Label>
//               <Input id="name" value={username} placeholder={''} onChange={(e) => setUsername(e.target.value)} className="col-span-3" />
//             </div>
//             <div className="grid grid-cols-5 items-center gap-4">
//               <Label htmlFor="status" className='col-span-3'>
//                 {t('TAG_STATUS')}
//               </Label>
//               {status == 'Pending Verification' ? <p className='text-orange-500 text-center text-sm col-span-2'>{status}</p> :
//                 <div className='flex justify-end col-span-2'>
//                   <Button
//                     onClick={HandleStatus}
//                     className={cn(
//                       "relative flex items-center transition-all duration-300 min-w-[110px]",
//                       status === "ACTIVE" ? "bg-blue-800 hover:bg-blue-700 justify-start" : "justify-end text-right",
//                       "rounded-lg"
//                     )}
//                   >
//                     <div
//                       className={cn(
//                         "absolute rounded-full bg-white w-5 h-5 transition-all duration-300",
//                         status === "ACTIVE" ? "translate-x-16 ease-linear" : "-translate-x-16 ease-linear"
//                       )}
//                     />
//                     <p
//                       className={cn(
//                         textVisible ? "opacity-100 " : "opacity-0"
//                       )}
//                     >
//                       {status}
//                     </p>
//                   </Button>
//                 </div>

//               }
//             </div>

//             <div className='space-y-3'>
//               <h1 className='text-2xl font-semibold'>{t('TAG_COMPANY')} {t('TAG_INFO')}.</h1>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="companyName" className='col-span-2' >
//                   {t('TAG_COMPANY')} {t('TAG_NAME')}
//                 </Label>
//                 <Input id="companyName" value={companyName} placeholder={data.companyName} onChange={(e) => setCompanyName(e.target.value)} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="companyEmail" className='col-span-2' >
//                   {t('TAG_COMPANY')} {t('TAG_EMAIL')}
//                 </Label>
//                 <Input id="companyEmail" value={companyEmail} placeholder={data.email} onChange={(e) => setCompanyEmail(e.target.value)} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="regNo" className='col-span-2' >
//                   {t('TAG_REGISTRATION_NO')}
//                 </Label>
//                 <Input id="regNo" value={regNo} placeholder={data.registrationNo} onChange={(e) => setRegNo(e.target.value)} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="tinNo" className='col-span-2' >
//                   {t('TAG_BUSINESS_TIN_NO')}
//                 </Label>
//                 <Input id="tinNo" value={tinNo} placeholder={data.businessTinNo} onChange={(e) => setTinNo(e.target.value)} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="sst" className='col-span-2' >
//                   {t('TAG_SST_REG_NO')}
//                 </Label>
//                 <Input id="sst" value={sstNo} placeholder={data.sstRegNo} onChange={(e) => setSSTNo(e.target.value)} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="tourNo" className='col-span-2' >
//                   {t('TAG_TOUR_REG_NO')}
//                 </Label>
//                 <Input id="tourNo" value={tourNo} placeholder={data.tourRegNo} onChange={(e) => setTourNo(e.target.value)} className="col-span-3" />
//               </div>
//               <div className='flex justify-end items-center'>
//                 <ConfirmButton className='bg-blue-900 hover:bg-blue-800' disabled={disableValidate}>{t('TAG_VALIDATE')}</ConfirmButton>
//               </div>
//             </div>

//             <div className='space-y-3'>
//               <h1 className='text-2xl font-semibold'>{t('TAG_ADDRESS')}.</h1>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="streetAddress" className='col-span-2' >
//                   {t('TAG_STREET_ADDRESS')} <Required />
//                 </Label>
//                 <Input id="streetAddress" value={streetAddress} placeholder={''} onChange={(e) => setStreetAddress(e.target.value)} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="zipCode" className='col-span-2' >
//                   {t('TAG_ZIPCODE')} <Required />
//                 </Label>
//                 <Input id="zipCode" value={zipCode} placeholder={''} onChange={(e) => setZipCode(e.target.value)} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="townCity" className='col-span-2' >
//                   {t('TAG_TOWN_CITY')} <Required />
//                 </Label>
//                 <Input id="townCity" value={townCity} placeholder={''} onChange={(e) => setTownCity(e.target.value)} className="col-span-3" />
//               </div>

//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="state" className='col-span-2' >
//                   {t('TAG_STATE')} <Required />
//                 </Label>
//                 <div className='col-span-3'>
//                   <Select
//                     // disabled={editable}
//                     value={state}
//                     onValueChange={(value) => setState(value)}
//                   // defaultValue={field.value}
//                   >
//                     <SelectTrigger>
//                       <SelectValue
//                         // defaultValue={field.value}
//                         placeholder="Select a State"
//                       />
//                     </SelectTrigger>
//                     <SelectContent className='max-h-[300px] overflow-y-scroll'>
//                       {/* @ts-ignore  */}
//                       <SelectGroup>
//                         {stateList?.map((state, index) => (
//                           <SelectItem key={index} value={state.stateCode}>
//                             {state.stateName}
//                           </SelectItem>

//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 {/* <Input id="state" value={state} placeholder={''} onChange={(e) => setState(e.target.value)} className="col-span-3" /> */}
//               </div>

//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="country" className='col-span-2' >
//                   {t('TAG_COUNTRY')} <Required />
//                 </Label>
//                 <div className='w-full col-span-3'>
//                   <Select
//                     // disabled={editable}
//                     value={country}
//                     onValueChange={(value) => setCountry(value)}
//                   // defaultValue={field.value}
//                   >
//                     {/* <FormControl> */}
//                     <SelectTrigger>
//                       <SelectValue
//                         placeholder="Select a Country"
//                       />
//                     </SelectTrigger>
//                     {/* </FormControl> */}
//                     <SelectContent >
//                       {/* @ts-ignore  */}
//                       <SelectGroup className='max-h-[300px]'>
//                         {countryList?.map((country, index) => (
//                           <SelectItem key={index} value={country.countryCode}>
//                             {country.countryName}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             <div className='space-y-3'>
//               <h1 className='text-2xl font-semibold'>{t('TAG_CONTACT')}</h1>
//               <div className="grid grid-cols-5 items-center gap-4">
//                 <Label htmlFor="contactNo" className='col-span-2' >
//                   {t('TAG_CONTACT_NO')}
//                 </Label>
//                 <Input id="contactNo" disabled={true} value={contactPrefix} placeholder={''} className="" />
//                 <Input id="contactNo" value={contactNo} placeholder={''} onChange={(e) => setContactNo(e.target.value)} className="col-span-2" />
//               </div>
//             </div>
//           </div>
//           <SheetFooter>
//             {/* <SheetClose asChild> */}
//             <ConfirmButton type="submit" className='bg-blue-800 hover:bg-blue-700' onClick={() => { HandleConfirm() }}>{t('TAG_CONFIRM')}</ConfirmButton>
//             {/* </SheetClose> */}
//           </SheetFooter>
//         </div>
//         <ScrollBar />
//       </ScrollArea>
//     </SheetContent>
//   )
// }

