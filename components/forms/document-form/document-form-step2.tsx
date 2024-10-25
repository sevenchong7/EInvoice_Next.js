import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentFormValues } from "@/lib/form-schema";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import Required from "@/components/ui/required";
import { useTranslations } from "next-intl";
import React from "react";
import { getMerchantInfo } from "@/lib/services/userService";
import { CountryList, merchants, StateList } from "@/constants/data";
import { getCountry } from "@/lib/services/generalService";
import { ConfirmButton } from "@/components/ui/confirmButton";

interface MerchantParam {
    address: string;
    businessTinNo: string;
    city: string;
    companyName: string;
    contact: string;
    contactPrefix: string;
    country: string;
    email: string;
    joinDate: string;
    merchantId: number;
    postcode: string;
    registrationNo: string;
    stateId: string;

}

export default function DocumentFormStep2(
    {
        form,
    }: {
        form: UseFormReturn<DocumentFormValues>;
    }) {
    const t = useTranslations();
    const [editable, setEditable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState('0')
    const [fav, setFav] = useState(false);
    const [FavDeli, setFavDeli] = useState(false);
    const [supplierError, setSupplierError] = useState(false);
    const [buyerError, setBuyerError] = useState(false);

    const [merchantInfo, setMerchantInfo] = useState<MerchantParam>()
    const [supplierCountries, setSupplierCountries] = useState<CountryList[]>()
    const [supplierStates, setSupplierStates] = useState<StateList[]>();
    const [buyerCountries, setBuyerCountries] = useState<CountryList[]>()
    const [buyerStates, setBuyerStates] = useState<StateList[]>();
    const [deliveryCountries, setDeliveryCountries] = useState<CountryList[]>()
    const [deliveryStates, setDeliveryStates] = useState<StateList[]>();

    async function getMerchant() {
        return await getMerchantInfo();
    };

    const GetCountryInfo = async () => {
        return await getCountry();
    }

    useEffect(() => {
        GetCountryInfo().then((value) => {
            setSupplierCountries(value)
            setBuyerCountries(value)
            setDeliveryCountries(value)
        })

        getMerchant().then((res) => {
            setMerchantInfo(res)
        });
    }, [])

    useEffect(() => {
        form.setValue('supplierIndustryName', merchantInfo?.companyName)
        form.setValue('supplierTaxIndentificationNumber', merchantInfo?.businessTinNo)
        form.setValue('supplierBusinessRegNumber', merchantInfo?.registrationNo)
        // form.setValue('sstRegNumber', merchantInfo?.)
        // form.setValue('supplierIndustryName', merchantInfo?.companyName)
        form.setValue('supplierLine', merchantInfo?.address)
        form.setValue('supplierZipCode', merchantInfo?.postcode)
        form.setValue('supplierCity', merchantInfo?.city)
        form.setValue('supplierCountry', merchantInfo?.country)
        form.setValue('supplierState', merchantInfo?.stateId)
        form.setValue('supplierContactPrefix', merchantInfo?.contactPrefix)
        form.setValue('supplierContact', merchantInfo?.contact)
        form.setValue('supplierEmail', merchantInfo?.email || '')
    }, [merchantInfo])

    useEffect(() => {
        supplierCountries?.map((value) => {
            if (form.getValues('supplierCountry') == value.countryCode) {
                setSupplierStates(value.stateList)
                form.setValue('supplierContactPrefix', value.contactPrefix);
            }
        })

    }, [form.watch('supplierCountry')])

    useEffect(() => {
        buyerCountries?.map((value) => {
            if (form.getValues('buyerCountry') == value.countryCode) {
                setBuyerStates(value.stateList)
                form.setValue('buyerContactPrefix', value.contactPrefix);
            }
        })
    }, [form.watch('buyerCountry')])

    useEffect(() => {
        deliveryCountries?.map((value) => {
            if (form.getValues('deliveryCountry') == value.countryCode) {
                setDeliveryStates(value.stateList)
            }
        })
    }, [form.watch('deliveryCountry')])


    const {
        control,
        formState: { errors }
    } = form;

    const HandleFav = () => {
        setFav(true)
    }

    const HandleFavDeli = () => {
        setFavDeli(true)
    }

    useEffect(() => {
        if (errors.supplierIndustryClassCode) {
            setSupplierError(false)
        } else {
            setSupplierError(true)
        }

        if (errors.buyerRegisterName || errors.buyerSSTRegisterNumber || errors.buyerContact) {
            setBuyerError(false)
        } else {
            setBuyerError(true)
        }

    }, [errors.supplierIndustryClassCode, errors.buyerRegisterName, errors.buyerSSTRegisterNumber, errors.buyerContact])

    const SupplierContent = () => {
        return (
            <>
                <div className="pt-[20px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_ACCOUNT_INFORMATION')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name="supplierIndustryClassCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_INDUSTRY_CLASSIFICATION_CODE')} <Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="supplierIndustryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_REGISTRATION_NAME')} <Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={true}
                                            {...field}
                                        // defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name="supplierTaxIndentificationNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_TAX_IDENTIFICATION_NUMBER')} (TIN)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={true}
                                            {...field}
                                        // defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="supplierBusinessRegNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_BUSINESS_REGISTRATION_NUMBER')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={true}
                                            {...field}
                                        // defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name="sstRegNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_SST_REGISTRATION_NUMBER')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={true}
                                            {...field}
                                        // defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tourismTaxRegistrationNum"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_TOURISM_TAX_REGISTRATION_NUMBER')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={true}
                                            {...field}
                                        // defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="pt-[20px] space-y-3">
                    <div>
                        <div className="flex justify-between items-centers pb-1">
                            <h1 className="text-2xl font-semibold">{t('TAG_ADDRESS')}</h1>
                            <Button onClick={() => setEditable(!editable)}>{t('TAG_EDIT')}</Button>
                        </div>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">

                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name={'supplierLine'}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('TAG_ADDRESS')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={editable}
                                                {...field}
                                            // defaultValue={''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">

                        <FormField
                            control={form.control}
                            name={'supplierZipCode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_ZIPCODE')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={editable}
                                            {...field}
                                        // defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'supplierCity'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_CITY')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={editable}
                                            {...field}
                                        // defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'supplierCountry'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_COUNTRY')}</FormLabel>
                                    <FormControl>
                                        {/* <Input
                                            type="text"
                                            disabled={editable}
                                            {...field}
                                        // defaultValue={''}
                                        /> */}

                                        <Select
                                            disabled={editable}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        // defaultValue={field.value}
                                                        placeholder="Select a Country"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                                {/* @ts-ignore  */}
                                                {supplierCountries?.map((country, index) => (
                                                    <SelectItem key={index} value={country.countryCode}>
                                                        {country.countryName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'supplierState'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_STATE')}</FormLabel>
                                    <FormControl>
                                        {/* <Input
                                            type="text"
                                            disabled={editable}
                                            {...field}
                                        // defaultValue={''}
                                        /> */}
                                        <Select
                                            disabled={editable}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        // defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        // defaultValue={field.value}
                                                        placeholder="Select a State"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                                {/* @ts-ignore  */}
                                                {supplierStates?.map((state, index) => (
                                                    <SelectItem key={index} value={state.stateCode}>
                                                        {state.stateName}
                                                    </SelectItem>

                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="pt-[20px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_CONTACT')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'supplierContact'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_CONTACT_NO')}</FormLabel>
                                    <FormControl>
                                        <div className="flex w-full">
                                            <div className="max-w-[80px] mr-5">
                                                <Input
                                                    type="text"
                                                    disabled={true}
                                                    value={form.getValues('supplierContactPrefix')}
                                                // value={form.getValues()}
                                                // {...field}
                                                // defaultValue={''}
                                                />
                                            </div>
                                            <div className="flex flex-auto grow w-full">
                                                <Input
                                                    type="text"
                                                    disabled={editable}
                                                    {...field}
                                                // defaultValue={''}
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'supplierEmail'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_EMAIL')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={editable}
                                            {...field}
                                            onChange={(e) => field.onChange(e)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>
            </>
        )
    }

    const BuyerContent = () => {
        return (
            <>
                <div className="flex flex-row justify-between mt-[20px]">
                    <div className="flex items-center">
                        <p>{t('TAG_FAVORITE_USER')}</p>
                        <div className="ml-[20px]">
                            <Select >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={t('TAG_SELECT_USER')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => { }} className="flex flex-row items-center justify-between">
                                {t('TAG_FAVORITE')}
                                <div className={` ml-2 ${!fav ? "text-gray-500 " : " text-yellow-400"} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-fit" aria-describedby={undefined}>
                            <DialogHeader className="items-center">
                                <DialogTitle className="text-2xl">{t('TAG_FAVORITE_MODAL_TITLE')}</DialogTitle>
                            </DialogHeader>
                            <div className="p-[10px]">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-center text-sm whitespace-pre-wrap">
                                        {t('TAG_FAVORITE_MODAL_DESC')}
                                    </p>
                                </div>

                            </div>
                            <DialogFooter className="flex flex-row justify-between w-full sm:justify-between pt-[20px]">
                                <DialogClose asChild>
                                    <Button onClick={() => { setFav(false) }} type="button" variant="secondary">{t('TAG_CANCEL')}</Button>
                                </DialogClose>
                                <DialogClose>
                                    <ConfirmButton onClick={() => { HandleFav() }} type="submit">{t('TAG_CONFIRM')}</ConfirmButton>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog >
                </div >

                <div className="pt-[30px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_PARTY_INFORMATION')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'buyerRegisterName'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_REGISTRATION_NAME')} <Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerSSTRegisterNumber'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_SST_REGISTRATION_NUMBER')} <Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div >
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'buyerIdType'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_ID_TYPE')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            // defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <SelectTrigger >
                                                <SelectValue placeholder={t('TAG_ID_TYPE')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="ic">{t('TAG_IDENTIFICATION_CARD_NO')}</SelectItem>
                                                    <SelectItem value="passport">{t('TAG_PASSPORT_NO')}</SelectItem>
                                                    <SelectItem value="business">{t('TAG_BUSINESS_REGISTRATION_NO')}</SelectItem>
                                                    <SelectItem value="army">{t('TAG_ARMY_NO')}</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px] items-end">
                        <FormField
                            control={form.control}
                            name={'buyerRegistration_Identification_PassportNumber'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_REGISTRATION_IDENTIFICATION_PASSPORT_NUMBER')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerTaxIdentificationNumber'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_TAX_IDENTIFICATION_NUMBER')} (TIN)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col items-start">
                            <ConfirmButton className="bg-blue-800 hover:bg-blue-900 ">{t('TAG_VALIDATE')}</ConfirmButton>
                        </div>
                    </div>
                </div>

                <div className="pt-[20px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_ADDRESS')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name={'buyerLine'}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('TAG_ADDRESS')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'buyerZipCode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_ZIPCODE')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerCity'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_TOWN_CITY')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerCountry'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_COUNTRY')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        // defaultValue={field.value}
                                                        placeholder="Select a Country"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                                {/* @ts-ignore  */}
                                                {buyerCountries?.map((country, index) => (
                                                    <SelectItem key={index} value={country.countryCode}>
                                                        {country.countryName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'buyerState'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_STATE')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        // defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        // defaultValue={field.value}
                                                        placeholder="Select a State"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                                {/* @ts-ignore  */}
                                                {buyerStates?.map((state, index) => (
                                                    <SelectItem key={index} value={state.stateCode}>
                                                        {state.stateName}
                                                    </SelectItem>

                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="pt-[20px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_CONTACT')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">

                        <FormField
                            control={form.control}
                            name={'buyerContact'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_CONTACT_NO')} <Required /></FormLabel>
                                    <FormControl>
                                        <div className="flex w-full">
                                            <div className="max-w-[80px] mr-5">
                                                <Input
                                                    type="text"
                                                    disabled={true}
                                                    value={form.getValues('buyerContactPrefix')}
                                                // value={form.getValues()}
                                                // {...field}
                                                // defaultValue={''}
                                                />
                                            </div>
                                            <div className="flex flex-auto grow w-full">
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    {...field}
                                                // defaultValue={''}
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name={'buyerEmail'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_EMAIL')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </>
        )
    }

    const DeliveryContent = () => {
        return (
            <>
                <div className="flex flex-row justify-between mt-[20px]">
                    <div className="flex items-center">
                        <p>{t('TAG_FAVORITE_DELIVERY')}</p>
                        <div className="ml-[20px]">
                            <Select >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={t('TAG_SELECT_DELIVERY')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => { }} className="flex flex-row items-center justify-between">
                                {t('TAG_FAVORITE')}
                                <div className={` ml-2 ${!FavDeli ? "text-gray-500 " : " text-yellow-400"} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-fit" aria-describedby={undefined}>
                            <DialogHeader className="items-center">
                                <DialogTitle className="text-2xl">{t('TAG_FAVORITE_MODAL_TITLE')}</DialogTitle>
                            </DialogHeader>
                            <div className="p-[10px]">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-center text-sm whitespace-pre-wrap">
                                        {t('TAG_FAVORITE_MODAL_DESC')}
                                    </p>
                                </div>
                            </div>
                            <DialogFooter className="flex flex-row justify-between w-full sm:justify-between pt-[20px]">
                                <DialogClose asChild>
                                    <Button onClick={() => { setFavDeli(false) }} type="button" variant="secondary">{t('TAG_CANCEL')}</Button>
                                </DialogClose>
                                <DialogClose>
                                    <ConfirmButton onClick={() => { HandleFavDeli() }} type="submit">{t('TAG_CONFIRM')}</ConfirmButton>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog >
                </div >

                <div className="pt-[20px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_PARTY_INFORMATION')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'deliveryName'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_NAME')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'deliveryIdType'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_ID_TYPE')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            // defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <SelectTrigger >
                                                <SelectValue placeholder="Invoice Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="ic">{t('TAG_IDENTIFICATION_CARD_NO')}</SelectItem>
                                                    <SelectItem value="passport">{t('TAG_PASSPORT_NO')}</SelectItem>
                                                    <SelectItem value="business">{t('TAG_BUSINESS_REGISTRATION_NO')}</SelectItem>
                                                    <SelectItem value="army">{t('TAG_ARMY_NO')}</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px] items-end">
                        <FormField
                            control={form.control}
                            name={'deliveryRegistration_Identification_PassportNumber'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_REGISTRATION_IDENTIFICATION_PASSPORT_NUMBER')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryShippingRecipientTin'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_SHIPPING_RECIPIENT_TIN')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col items-start justify-end">
                            <ConfirmButton className="bg-blue-800 hover:bg-blue-900">{t('TAG_VALIDATE')}</ConfirmButton>
                        </div>
                    </div>
                </div>

                <div className="pt-[20px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_ADDRESS')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name={'deliveryLine'}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('TAG_ADDRESS')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">

                        <FormField
                            control={form.control}
                            name={'deliveryZipCode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_ZIPCODE')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryCity'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_TOWN_CITY')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryCountry'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_COUNTRY')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        // defaultValue={field.value}
                                                        placeholder="Select a Country"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                                {/* @ts-ignore  */}
                                                {deliveryCountries?.map((country, index) => (
                                                    <SelectItem key={index} value={country.countryCode}>
                                                        {country.countryName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <FormField
                            control={form.control}
                            name={'deliveryState'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_STATE')}</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        // defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        // defaultValue={field.value}
                                                        placeholder="Select a State"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                                {/* @ts-ignore  */}
                                                {deliveryStates?.map((state, index) => (
                                                    <SelectItem key={index} value={state.stateCode}>
                                                        {state.stateName}
                                                    </SelectItem>

                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="pt-[20px] space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{t('TAG_IMPORT_EXPORT_INFORMATION')}</h1>
                        <Separator />
                    </div>
                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px] items-end">
                        <FormField
                            control={form.control}
                            name={'deliveryReferenceNumber'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_DELIVERY_REFERENCE_NUMBER')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryRefNumIncoterm'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_INCOMTERMS')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryFreeTradeAgreement'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_DELIVERY_FREE_TRADE_AGREEMENT')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px] items-end">
                        <FormField
                            control={form.control}
                            name={'deliveryAuth_No_for_Cert_Export'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_DELIVERY_AUTH_NO_FOR_CERT_EXPORT')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryAuth_No_Incoterm'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_INCOMTERMS')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryDetailofOtherCharges'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_DETAIL_OF_OTHER_CHARGE')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="gap-8 md:grid md:grid-cols-3 pl-[20px]">
                        <div className="col-span-3">
                            <FormField
                                control={form.control}
                                name={'deliveryDetailofOtherChargesDescirption'}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('TAG_DETAILS_OF_OTHER_CHARGES_DESCRIPTION')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="p-1">
            <Tabs defaultValue="supplier" className="w-full ">
                <TabsList className="flex w-full h-full">
                    <TabsTrigger onClick={() => { setTabs('0') }} value="supplier" className={`flex-1 h-[40px] ${tabs == '0' && 'flex-[2]'}`}>
                        {t('TAG_SUPPLIER')}
                        {!supplierError &&
                            <div className="ml-[10px] text-orange-500">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit">
                                        <h1>
                                            {t('TAG_SUPPLIER_ERROR')}
                                        </h1>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        }
                    </TabsTrigger>
                    <TabsTrigger onClick={() => { setTabs('1') }} value="buyer" className={`flex-1 h-[40px] ${tabs == '1' && 'flex-[2]'}`}>
                        {t('TAG_BUYER')}
                        {!buyerError &&
                            <div className="ml-[10px] text-orange-500">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit">
                                        <h1>
                                            {t('TAG_BUYER_ERROR')}
                                        </h1>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        }
                    </TabsTrigger>
                    <TabsTrigger onClick={() => { setTabs('2') }} value="delivery" className={`flex-1 h-[40px] ${tabs == '2' && 'flex-[2]'}`}>
                        {t('TAG_DELIVERY')}
                        {/* {!deliveryError &&
                            <div className="ml-[10px] text-orange-500">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit">
                                        <h1>
                                            There are still required field that are empty in the Delivery Form!
                                        </h1>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        } */}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="supplier">
                    <SupplierContent />
                </TabsContent>
                <TabsContent value="buyer">
                    <BuyerContent />
                </TabsContent>
                <TabsContent value="delivery">
                    <DeliveryContent />
                </TabsContent>
            </Tabs >
        </div>
    )
}