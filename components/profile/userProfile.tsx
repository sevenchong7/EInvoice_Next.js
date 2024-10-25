'use client';
import { useEffect, useState } from "react";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { useStore } from "@/action/action";
import { Divide } from "lucide-react";
import { CustomeModal } from "../modal/custome-modal";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useRouter } from "next/navigation";
import Required from "../ui/required";
import { useTranslations } from "next-intl";
import React from "react";
import { getMerchantInfo, getSubscription } from "@/lib/services/userService";
import { CountryList, MerchantInfo, StateList, SubscriptionInfo } from "@/constants/data";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from "../ui/scroll-area";
import { ConfirmButton } from "../ui/confirmButton";

export default function UserProfile({ subscriptionData, merchantInfoData, countryData }: { subscriptionData: any, merchantInfoData: any, countryData: any }) {
    const t = useTranslations()
    const router = useRouter()
    // const { setCompany, company } = useStore();
    const [incomplete, setIncomplete] = useState(false);
    const [open, setOpen] = useState(false);
    const [merchantInfo, setMerchantInfo] = useState<MerchantInfo>()
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>();
    const [openSheet, setOpenSheet] = useState(false)

    // const GetMerchantInfo = () => {
    //     return getMerchantInfo()
    // }

    // const GetSubscription = () => {
    //     return getSubscription()
    // }

    useEffect(() => {
        setMerchantInfo(merchantInfoData)
        setSubscriptionInfo(subscriptionData)
        // GetMerchantInfo().then((data) => setMerchantInfo(data))
        // GetSubscription().then((subData) => setSubscriptionInfo(subData))
    }, [subscriptionData, merchantInfoData])

    useEffect(() => {
        if (merchantInfo?.address == '' || merchantInfo?.address == undefined || merchantInfo?.address == null) {
            setIncomplete(true);
        }
    }, [merchantInfo])

    const onConfirm = () => {
        //TODO
    }

    return (
        <>
            <CustomeModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={false}
                title={
                    <>
                        <div className="flex flex-row space-x-5 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg>
                            <p className="text-2xl font-medium">{t('TAG_SHARE_WORKSPACE')}</p>
                        </div>
                    </>}
                content={
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row space-x-5">
                                <div className="flex flex-col bg-gray-400 text-center items-center justify-center rounded-full h-10 w-10">
                                    <h1 className="text-lg font-medium">{merchantInfo?.companyName.charAt(0).toUpperCase()}</h1>
                                </div>
                                <div className="flex flex-col">
                                    <h1>{merchantInfo?.companyName}</h1>
                                    <p className="text-sm text-gray-400">{merchantInfo?.registrationNo}</p>
                                </div>
                            </div>
                            <div className="bg-black w-32 h-32">
                            </div>
                        </div>

                        <div className="pt-10 space-y-3">
                            <Button className="w-full bg-blue-800 hover:bg-blue-700">{t('TAG_COPY_PROFILE_LINK')}</Button>
                            <button className="text-sm text-gray-400 w-full hover:underline">{t('TAG_GENERATE_QR')}</button>
                        </div>
                    </>
                }
                titleClassName={"items-left"}
            />

            <div className="flex items-center justify-between">
                <Heading title={t('TAG_PROFILE')} description={t('TAG_USER_PROFILE')} />
            </div>
            <Separator />
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-row items-center space-x-5">
                    <div className="flex items-center space-x-1">
                        <div className="flex bg-gray-300 rounded-full md:w-20 md:h-20 w-10 h-10 items-center justify-center">
                            <h1 className="text-center font-semibold md:text-5xl text-2xl">{merchantInfo?.companyName.charAt(0).toUpperCase()}</h1>
                        </div>
                        <div className="flex flex-col ">
                            <h1 className="md:text-3xl text-md font-semibold">{merchantInfo?.companyName}</h1>
                            <p className="text-gray-400 md:text-sm text-sm">{merchantInfo?.registrationNo}</p>
                        </div>
                    </div>
                    <div>
                        {incomplete ?
                            <Incomplete />
                            :
                            <div>

                            </div>
                        }
                    </div>
                </div>
                <Button onClick={() => setOpen(true)}><p className="pr-2">{t('TAG_SHARE')}</p> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg></Button>
            </div>

            <div className="md:grid md:grid-cols-2 gap-8">
                <div className="rounded-lg shadow-md shadow-gray-400 p-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-medium">{t('TAG_PERSONAL_INFROMATION')}</h1>
                        <div>
                            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                                <SheetTrigger asChild>
                                    <Button>{t('TAG_EDIT')}</Button>
                                </SheetTrigger>
                                <EditProfile merchantInfoData={merchantInfo} countryData={countryData} openSheet={openSheet} />
                            </Sheet>
                        </div>
                    </div>
                    <div className="gap-4 grid md:grid-cols-2 py-10">
                        <div className="pl-8 col-span-2">
                            <h1>{t('TAG_COMPANY_NAME')}</h1>
                            <p className="font-light">{merchantInfo?.companyName}</p>
                        </div>
                        <div className="pl-8 col-span-2">
                            <h1>{t('TAG_EMAIL')}</h1>
                            <p className="font-light">{merchantInfo?.email}</p>
                        </div>
                        <div className="pl-8">
                            <h1>{t('TAG_REGISTER_NO')}</h1>
                            <p className="font-light">{merchantInfo?.registrationNo}</p>
                        </div>

                        <div className="pl-8">
                            <h1>{t('TAG_BUSINESS_TIN_NO')}</h1>
                            <p className="font-light">{merchantInfo?.businessTinNo}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg shadow-md shadow-gray-400 p-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-medium">{t('TAG_SUBSCRIPTIONS')}</h1>
                        <Button onClick={() => router.push('/dashboard/profile/subscription')}>{t('TAG_VIEW')}</Button>

                    </div>
                    <div className="gap-4  grid md:grid-cols-2 py-10">
                        <div className="pl-8">
                            <h1>{t('TAG_CURRENT_SUBSCRIPTIONS')}</h1>
                            <p className="font-light">
                                {
                                    subscriptionInfo?.packageList.map((res) => {
                                        if (res.PackageIdentifier === subscriptionInfo?.currentPackageId) {
                                            return res.PackageName
                                        }
                                    })
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 rounded-lg shadow-md shadow-gray-400 p-5">
                    <div className="flex justify-between items-center ">
                        <div className="flex flex-row items-center space-x-5">
                            <h1 className="text-2xl font-medium text-nowrap">{t('TAG_COMPANY_INFORMATION')}</h1>
                            {
                                incomplete ?
                                    <Incomplete />
                                    :
                                    <div>

                                    </div>
                            }
                        </div>
                        {/* <Sheet>
                            <SheetTrigger asChild>
                                <Button >{t('TAG_EDIT')}</Button>
                            </SheetTrigger>
                            <EditCompanyInfo data={merchantInfo} />
                        </Sheet> */}
                    </div>
                    <div className="lg:grid lg:grid-cols-2 py-10">
                        <div className="gap-8 grid grid-cols-2 ">
                            <div className="col-span-2 pl-8">
                                <h1 className="text-2xl">{t('TAG_ADDRESS')}</h1>
                            </div>
                            <div className="col-span-2 pl-8">
                                <div>
                                    <h1>{t('TAG_STREET_ADDRESS')}</h1>
                                    {merchantInfo?.address == null || merchantInfo?.address == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{merchantInfo?.address}</p>
                                    }
                                </div>
                            </div>
                            {/* <div className="col-span-2 pl-8">
                                <div>
                                    <h1>{t('TAG_APT_SUITE_BUILDING')}</h1>
                                    {company.apt_suite_building == null || company.apt_suite_building == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.apt_suite_building}</p>
                                    }
                                </div>
                            </div> */}
                            <div className="pl-8">
                                <div>
                                    <h1>{t('TAG_ZIPCODE')}</h1>
                                    {merchantInfo?.postcode == null || merchantInfo?.postcode == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{merchantInfo?.postcode}</p>
                                    }
                                </div>
                            </div>
                            <div className="pl-8">
                                <div>
                                    <h1>{t('TAG_TOWN_CITY')}</h1>
                                    {merchantInfo?.city == null || merchantInfo?.city == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{merchantInfo?.city}</p>
                                    }
                                </div>
                            </div>
                            <div className="pl-8">
                                <div>
                                    <h1>{t('TAG_STATE')}</h1>
                                    {merchantInfo?.stateId == null || merchantInfo?.stateId == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{merchantInfo?.stateId}</p>
                                    }
                                </div>
                            </div>
                            <div className="pl-8">
                                <div>
                                    <h1>{t('TAG_COUNTRY')}</h1>
                                    {merchantInfo?.country == null || merchantInfo?.country == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{merchantInfo?.country}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="gap-8 grid grid-cols-2 auto-rows-min">
                            <div className="col-span-2 pl-8">
                                <h1 className="text-2xl">{t('TAG_CONTACT')}</h1>
                            </div>
                            <div className="col-span-2 pl-8">
                                <div>
                                    <h1>{t('TAG_CONTACT_NO')}</h1>
                                    {merchantInfo?.contact == null || merchantInfo?.contact == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{merchantInfo.contactPrefix} {merchantInfo?.contact}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const Incomplete = () => {
    const t = useTranslations()
    return (
        <div className="flex flex-row rounded-lg bg-amber-400/50 px-2 py-1 space-x-2 text-orange-500 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="md:w-[24px] md:h-[24px] w-[12px] h-[12px]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            <p className="md:text-sm text-xs">{t('TAG_INCOMPLETE')}</p>
        </div>
    )
}


const EditProfile = ({ merchantInfoData, countryData, openSheet }: { merchantInfoData: MerchantInfo | undefined, countryData: CountryList[], openSheet: boolean }) => {
    const [companyName, setCompanyName] = useState(merchantInfoData?.companyName);
    const [regNo, setRegNo] = useState(merchantInfoData?.registrationNo);
    const [email, setEmail] = useState(merchantInfoData?.email);
    const [businessTinNo, setBusinessTinNo] = useState(merchantInfoData?.businessTinNo);
    const [address, setAddress] = useState(merchantInfoData?.address);
    const [zipCode, setZipCode] = useState(merchantInfoData?.postcode);
    const [town, setTown] = useState(merchantInfoData?.city);
    const [state, setState] = useState(merchantInfoData?.stateId);
    const [country, setCountry] = useState(merchantInfoData?.country);
    const [contact, setContact] = useState(merchantInfoData?.contact);
    const [contactPrefix, setContactPrefix] = useState(merchantInfoData?.contactPrefix)
    const [stateList, setStateList] = useState<StateList[]>()

    const t = useTranslations();

    useEffect(() => {
        if (openSheet) {
            countryData?.map((value) => {
                if (value.countryCode === merchantInfoData?.country) {
                    setStateList(value.stateList)
                    setContactPrefix(value.contactPrefix)
                }
            })
        }
    }, [openSheet, countryData])

    useEffect(() => {
        if (openSheet) {
            countryData?.map((value) => {
                if (value.countryCode === country) {
                    setStateList(value.stateList)
                    setContactPrefix(value.contactPrefix)
                }
            })
        }
    }, [openSheet, country])

    useEffect(() => {
        if (openSheet) {
            setCountry(merchantInfoData?.country)
            setState(merchantInfoData?.stateId)
        }
    }, [openSheet])

    const HandleEditProfile = () => {
        const editProfileParam = {
            "companyName": companyName,
            "companyEmail": email,
            "registrationNo": regNo,
            "busTinNo": businessTinNo,
            "sstRegNo": merchantInfoData?.sstRegNo,
            "tourRegNo": merchantInfoData?.tourRegNo,
            "streetAddress": address,
            "postCode": zipCode,
            "city": town,
            "state": state,
            "country": country,
            "contactPrefix": '',
            "contact": contact
        }
    }

    return (
        <ScrollArea onWheel={(e) => {
            e.stopPropagation();
        }}>
            <SheetContent className="md:min-w-[500px] lg:min-w-[500px]  max-[600px]:min-w-full  space-y-2">

                <SheetHeader>
                    <SheetTitle className='text-2xl'>{t('TAG_PERSONAL_INFROMATION')}</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-8">
                        <Label htmlFor="name" className="col-span-2">
                            {t('TAG_COMPANY_NAME')}
                        </Label>
                        <Input id="name" value={companyName} placeholder={merchantInfoData?.companyName} onChange={(e) => setCompanyName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-8">
                        <Label htmlFor="email" className="col-span-2">
                            {t('TAG_EMAIL')}
                        </Label>
                        <Input id="email" value={email} placeholder={merchantInfoData?.email} type='email' onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-8">
                        <Label htmlFor="role" className="col-span-2">
                            {t('TAG_REGISTRATION_NO')}
                        </Label>
                        <Input id="role" type='text' value={regNo} placeholder={merchantInfoData?.registrationNo} onChange={(e) => setRegNo(e.target.value)} className="col-span-3" disabled={true} />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-8">
                        <Label htmlFor="businessTinNo" className="col-span-2">
                            {t('TAG_BUSINESS_TIN_NO')}
                        </Label>
                        <Input id="businessTinNo" value={businessTinNo} placeholder={merchantInfoData?.businessTinNo} type='text' onChange={(e) => setBusinessTinNo(e.target.value)} className="col-span-3" disabled={true} />
                    </div>

                </div>
                <div>
                    <SheetHeader>
                        <SheetTitle className='text-2xl'>{t('TAG_COMPANY_INFORMATION')}</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <h1 className="text-2xl font-medium">{t('TAG_ADDRESS')}</h1>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="address" className="text-nowrap">
                                {t('TAG_STREET_ADDRESS')} <Required />
                            </Label>
                            <Input id="address" value={address} placeholder={merchantInfoData?.address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        {/* <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="apt" >
                        {t('TAG_APT_SUITE_BUILDING')}
                    </Label>
                    <Input id="apt" type='text' value={apt_suite_building} placeholder={company.apt_suite_building} onChange={(e) => setApt_suite_building(e.target.value)} />
                </div> */}
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="zipCode" className="text-nowrap">
                                {t('TAG_ZIPCODE')} <Required />
                            </Label>
                            <Input id="zipCode" value={zipCode} placeholder={merchantInfoData?.postcode} type='email' onChange={(e) => setZipCode(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="town" className="text-nowrap">
                                {t('TAG_TOWN_CITY')} <Required />
                            </Label>
                            <Input id="town" value={town} placeholder={merchantInfoData?.city} type='text' onChange={(e) => setTown(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="state" className="text-nowrap">
                                {t('TAG_STATE')} <Required />
                            </Label>
                            <Select
                                // disabled={editable}
                                value={state}
                                onValueChange={(value) => setState(value)}
                            // defaultValue={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        // defaultValue={field.value}
                                        placeholder="Select a State"
                                    />
                                </SelectTrigger>
                                <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                    {/* @ts-ignore  */}
                                    <SelectGroup>
                                        {stateList?.map((state, index) => (
                                            <SelectItem key={index} value={state.stateCode}>
                                                {state.stateName}
                                            </SelectItem>

                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="country" className="text-nowrap">
                                {t('TAG_COUNTRY')} <Required />
                            </Label>
                            <Select
                                // disabled={editable}
                                value={country}
                                onValueChange={(value) => setCountry(value)}
                            // defaultValue={field.value}
                            >
                                {/* <FormControl> */}
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder="Select a Country"
                                    />
                                </SelectTrigger>
                                {/* </FormControl> */}
                                <SelectContent >
                                    {/* @ts-ignore  */}
                                    <SelectGroup className='max-h-[300px]'>
                                        {countryData?.map((country, index) => (
                                            <SelectItem key={index} value={country.countryCode}>
                                                {country.countryName}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <div className="grid gap-4 py-4">
                        <h1 className="text-2xl font-medium">{t('TAG_CONTACT')}</h1>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="contact" className="text-nowrap">
                                {t('TAG_CONTACT_NO')}.<Required />
                            </Label>
                            <div className="flex space-x-2">
                                <Input id="contactPrefix" value={contactPrefix} placeholder={merchantInfoData?.contactPrefix} onChange={(e) => setContactPrefix(e.target.value)} disabled={true} className="max-w-[70px]" />
                                <Input id="contact" value={contact} placeholder={merchantInfoData?.contact} onChange={(e) => setContact(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <ConfirmButton type="submit" onClick={() => HandleEditProfile()} className='bg-blue-800 hover:bg-blue-700'>{t('TAG_CONFIRM')}</ConfirmButton>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </ScrollArea>


    )
}
