import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { useTranslations } from "next-intl";
import React from "react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function RegisterUserStep2Admin({ form }: { form: UseFormReturn<RegisterUserAdminFormValues> }) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations()

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
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_STATE')}</FormLabel>
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
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_COUNTRY')}</FormLabel>
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

        </>
    )
}