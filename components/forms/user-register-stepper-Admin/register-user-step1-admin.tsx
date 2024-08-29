import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function RegisterUserStep1Admin({ form }: { form: UseFormReturn<RegisterUserAdminFormValues> }) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
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
            <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
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
            <FormField
                control={form.control}
                name="registerNo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Register No.</FormLabel>
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
            <FormField
                control={form.control}
                name="businessTinNo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Tin No.</FormLabel>
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
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
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
            <FormField
                control={form.control}
                name="confirmPw"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirmation Password</FormLabel>
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
        </>
    )
}