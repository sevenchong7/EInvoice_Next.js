import { StateListParam } from "@/lib/interface/generalInterface";
import { putEditMerchantInfo } from "@/lib/services/userService";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Required from "../ui/required";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ConfirmButton } from "../ui/confirmButton";
import { useUserTaskStore } from "@/lib/store/userStore";

export const EditProfile = ({ openSheet }: { openSheet: boolean }) => {
    const t = useTranslations();
    const merchantInfoData = useUserTaskStore((state) => state.merchantInfoList)
    const [companyName, setCompanyName] = useState(merchantInfoData?.companyName);
    const [regNo, setRegNo] = useState(merchantInfoData?.registrationNo);
    const [email, setEmail] = useState(merchantInfoData?.email);
    const [businessTinNo, setBusinessTinNo] = useState(merchantInfoData?.businessTinNo);
    const [address, setAddress] = useState<string | undefined>(merchantInfoData?.address);
    const [zipCode, setZipCode] = useState<string | undefined>(merchantInfoData?.postcode);
    const [town, setTown] = useState<string | undefined>(merchantInfoData?.city);
    const [country, setCountry] = useState<string | undefined>(merchantInfoData?.country);
    const [state, setState] = useState<string | undefined>(merchantInfoData?.stateId);
    const [contact, setContact] = useState<string | undefined>(merchantInfoData?.contact);
    const [contactPrefix, setContactPrefix] = useState<string | undefined>(merchantInfoData?.contactPrefix)
    const [stateList, setStateList] = useState<StateListParam[]>()
    const session = useSession()
    const router = useRouter()
    const countryData = useGeneralTaskStore((state) => state.countryList)

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

    const HandleEditProfile = async () => {
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
        const editInfo = await putEditMerchantInfo(session.data?.user.merchantId, editProfileParam)
        if (editInfo.status) {
            router.refresh()
        }
    }

    return (

        <ScrollArea onWheel={(e) => {
            e.stopPropagation();
        }}>
            <SheetHeader>
                <SheetTitle className='text-2xl'>{t('TAG_PERSONAL_INFROMATION')}</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4 p-1">
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
            <div className="p-1">
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
        </ScrollArea>
    )
}
