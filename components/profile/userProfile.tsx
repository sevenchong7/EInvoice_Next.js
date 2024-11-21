'use client';
import { useEffect, useState } from "react";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
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
import { getMerchantInfo, getSubscription, putEditMerchantInfo } from "@/lib/services/userService";
import { CountryList, MerchantInfo, StateList, SubscriptionInfo } from "@/constants/data";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from "../ui/scroll-area";
import { ConfirmButton } from "../ui/confirmButton";
import { useSession } from "next-auth/react";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { GetCountryParam } from "@/lib/interface/generalInterface";
import { useUserTaskStore } from "@/lib/store/userStore";
import { EditProfile } from "./editUserProfile";

export default function UserProfile() {
    const t = useTranslations()
    const router = useRouter()
    const [incomplete, setIncomplete] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSheet, setOpenSheet] = useState(false)

    const subscriptionInfo = useUserTaskStore((state) => state.subscriptionList)
    const merchantInfo = useUserTaskStore((state) => state.merchantInfoList)

    useEffect(() => {
        if (merchantInfo?.address == '' || merchantInfo?.address == undefined || merchantInfo?.address == null) {
            setIncomplete(true);
        } else {
            setIncomplete(false);
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
                                <div className="flex flex-col text-left">
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
                        <div className="flex bg-gray-300 rounded-full md:w-20 md:h-20 w-10 h-10 items-center justify-center dark:bg-gray-500">
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
                                <SheetContent aria-describedby={undefined} className="md:min-w-[500px] lg:min-w-[500px]  max-[600px]:min-w-full  space-y-2">
                                    <EditProfile openSheet={openSheet} />
                                </SheetContent>
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

