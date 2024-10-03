import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import React from "react";

export default function RegisterUserStep2({ form }: { form: UseFormReturn<RegisterFormValues> }) {
    const [loading, setLoading] = useState(false);
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
                                    placeholder='Street Address*'
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
                                        placeholder='Zip Code *'
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
                                        placeholder='Town / City *'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <div className='flex flex-row pt-[20px] justify-between'>
                <div className='w-full mr-[20px]'>
                    <FormField
                        name='state'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='State *'
                                    />
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
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Country *'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <div className='pt-[20px]'>
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
        </>
    )
}