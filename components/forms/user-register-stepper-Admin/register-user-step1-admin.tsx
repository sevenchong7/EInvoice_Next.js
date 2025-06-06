import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { useTranslations } from "next-intl";
import React from "react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function RegisterUserStep1Admin({ form }: { form: UseFormReturn<RegisterUserAdminFormValues> }) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations()

    return (
        <>
            <div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_USERNAME')}</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    disabled={loading}
                                    placeholder="username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_EMAIL')}</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    disabled={loading}
                                    placeholder="johndoe@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_COMPANY_NAME')}</FormLabel>
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
            <div>
                <FormField
                    control={form.control}
                    name="businessRegisterNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_REGISTER_NO')}</FormLabel>
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
            <div>
                <FormField
                    control={form.control}
                    name="businessTinNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_BUSINESS_TIN_NO')}</FormLabel>
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
            <div />
            <div>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_PASSWORD')}</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    disabled={loading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="confirmPw"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('TAG_CONFIRMATION_PASSWORD')}</FormLabel>
                            <FormControl>
                                <PasswordInput
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