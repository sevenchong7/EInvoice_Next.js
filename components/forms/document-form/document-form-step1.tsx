import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormValues } from "@/lib/form-schema"

export default function DocumentFormStep1({ form }: { form: UseFormReturn<DocumentFormValues> }) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="pt-[20px]">
                <h1 className="text-3xl font-semibold">Invoice Information</h1>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="gap-8 md:grid md:grid-cols-3 p-[10px]">
                    <FormField
                        control={form.control}
                        name="invoiceId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invoice ID<span className={"text-red-500"}>*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        placeholder="INV5740523579847624739"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="issuesDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Issued Date Time<span className={"text-red-500"}>*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        type='date'
                                        disabled={loading}
                                        placeholder="Pick a date"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="currencyCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Currency Code<span className={"text-red-500"}>*</span></FormLabel>
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
                        name="invoiceType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invoice Type<span className={"text-red-500"}>*</span></FormLabel>
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
                        name="versionId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Version Id<span className={"text-red-500"}>*</span></FormLabel>
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
                </div>
            </div>

            <div className="pt-[50px]">
                <h1 className="text-3xl font-semibold">Invoice Period</h1>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="gap-8 md:grid md:grid-cols-3 p-[10px]">
                    <FormField
                        control={form.control}
                        name="startdate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date<span className={"text-red-500"}>*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        type='date'
                                        disabled={loading}
                                        placeholder="Start Date"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="enddate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date<span className={"text-red-500"}>*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        type='date'
                                        disabled={loading}
                                        placeholder="End Date"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
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
                </div>
            </div>

            <div className="pt-[50px]">
                <h1 className="text-3xl font-semibold">Invoice Information</h1>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="gap-8 md:grid md:grid-cols-3 p-[10px]">
                    <FormField
                        control={form.control}
                        name="invoiceDocRef"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invoice Doc References <span className={"text-red-500"}>*</span></FormLabel>
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
                        name="additionalInvoiceDocRef"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Invoice Doc References<span className={"text-red-500"}>*</span></FormLabel>
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
                </div>
            </div>
        </>
    )
}