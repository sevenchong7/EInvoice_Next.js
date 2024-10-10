import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import { PasswordInput } from "@/components/ui/passwordInput";
import React from "react";

export default function RegisterUserStep1({ form }: { form: UseFormReturn<RegisterFormValues> }) {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <FormField
                name='username'
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                disabled={loading}
                                {...field}
                                placeholder='Username *'
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='flex flex-row pt-[20px] justify-between'>
                <div className='w-full mr-[20px]'>
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

                <div className='w-full'>
                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        type="email"
                                        placeholder='Email*'
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
                        name='businessRegisterNo'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        {...field}
                                        type="string"
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
                                    <PasswordInput
                                        type="password"
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
                                    <PasswordInput
                                        type="password"
                                        disabled={loading}
                                        {...field}
                                        placeholder='Confirmation Password*'
                                    />
                                    {/* <Input
                                        type="password"
                                        disabled={loading}
                                        {...field}
                                        placeholder='Confirmation Password*'
                                    /> */}
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