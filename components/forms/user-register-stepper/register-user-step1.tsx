import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";

export default function RegisterUserStep1({ form }: { form: UseFormReturn<RegisterFormValues> }) {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                type="email"
                                disabled={loading}
                                {...field}
                                placeholder='Email Address*'
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='pt-[20px]'>
                <FormField
                    name='companyName'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    {...field}
                                    placeholder='Company Name*'
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
                        name='registerNo'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Register No.*'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='w-full'>
                    <FormField
                        name='businessTinNo'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Business Tin No*'
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
                        name='password'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Password*'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='w-full'>
                    <FormField
                        name='confirmPw'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        placeholder='Confirmation Password*'
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