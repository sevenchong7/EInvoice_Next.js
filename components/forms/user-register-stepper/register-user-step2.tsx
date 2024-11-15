'use client';
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCountry } from "@/lib/services/generalService";
import { CountryList, StateList } from "@/constants/data";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { StateListParam } from "@/lib/interface/generalInterface";


export default function RegisterUserStep2({ form }: { form: UseFormReturn<RegisterFormValues> }) {
    const [loading, setLoading] = useState(false);
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
                    name='streetAddress'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    {...field}
                                    placeholder='Street Address'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='pt-[20px]'>
                <FormField
                    name='aptSuite'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    {...field}
                                    placeholder='Apt, Suite, Building (Optional)'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>


            <div className='flex flex-row pt-[20px] justify-between'>
                <div className='w-full mr-[20px]'>
                    <FormField
                        name='zipCode'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Zip Code'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='w-full'>
                    <FormField
                        name='townCity'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Town / City'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <div className='flex flex-row pt-[20px] justify-between'>

                <div className='w-full'>
                    <FormField
                        name='country'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Country *'
                                    />
                                </FormControl> */}
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

                <div className='w-full ml-[20px]'>
                    <FormField
                        name='state'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
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
            </div>

            <div className='pt-[20px] flex'>
                <div className="max-w-[100px] mr-5 flex-auto">
                    <FormField
                        name='contactPrefix'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        {...field}
                                        value={field.value || ''}
                                    // placeholder='Contact No.'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="w-full flex-1">
                    <FormField
                        name='contactNo'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Contact No.'
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