'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CountryList, StateList } from "@/constants/data";
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { getCountry } from "@/lib/services/generalService";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { StateListParam } from "@/lib/interface/generalInterface";

export default function RegisterUserStep2Admin({ form }: { form: UseFormReturn<RegisterUserAdminFormValues> }) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations()
    const countries = useGeneralTaskStore((state) => state.countryList)
    const [states, setStates] = useState<StateListParam[]>();

    useEffect(() => {
        countries?.map((value) => {
            if (form.getValues('country') == value.countryCode) {
                setStates(value.stateList)
                form.setValue('contactPrefix', value.contactPrefix);
            }
        })
    }, [form.watch('country')])

    return (
        <>
            <div>
                <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_STREET_ADDRESS')}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='pt-[10px]'>
                <FormField
                    control={form.control}
                    name="aptSuite"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_APT_SUITE_BUILDING')}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='pt-[10px]'>
                <div className='flex justify-between'>
                    <div className='w-full pr-[10px]'>
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_ZIPCODE')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-full'>
                        <FormField
                            control={form.control}
                            name="townCity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_TOWN_CITY')}</FormLabel>
                                    <FormControl>
                                        <Input
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

            <div className='pt-[10px]'>
                <div className='flex justify-between'>
                    <div className='w-full pr-[10px]'>
                        <FormField
                            name='state'
                            control={form.control}
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
                                                {states?.map((state, index) => (
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
                    <div className='w-full'>
                        <FormField
                            name='country'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_COUNTRY')}</FormLabel>

                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={field.onChange}
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
                                            {countries?.map((country, index) => (
                                                <SelectItem key={index} value={country.countryCode}>
                                                    {country.countryName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className='flex pt-[10px] space-x-5'>
                <div className="max-w-[200px]">
                    <FormField
                        control={form.control}
                        name="contactPrefix"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_CONTACT_PREFIX')}</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full">
                    <FormField
                        control={form.control}
                        name="contactNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_CONTACT_NO')}</FormLabel>
                                <FormControl>
                                    <Input
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