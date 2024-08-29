import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function RegisterUserStep2Admin({ form }: { form: UseFormReturn<RegisterUserAdminFormValues> }) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div>
                <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
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
                            <FormLabel>Apt, Suite, Building (Optional)</FormLabel>
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
                                    <FormLabel>Zip Code</FormLabel>
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
                                    <FormLabel>Town / City</FormLabel>
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
                                    <FormLabel>State</FormLabel>
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
                                    <FormLabel>Country</FormLabel>
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
                            <FormLabel>Contact No.</FormLabel>
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