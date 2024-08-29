import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentFormValues } from "@/lib/form-schema";
import { useEffect, useState } from "react";
import { FieldArrayWithId, useFieldArray, UseFieldArrayAppend, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import fav from '@/public/favorite.svg'
import Image from "next/image";
import alertIcon from '@/public/alert.svg'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function DocumentFormStep4({ form }: { form: UseFormReturn<DocumentFormValues> }) {
    const [loading, setLoading] = useState(false);

    const {
        control,
        formState: { errors }
    } = form;

    const {
        append: appendPaymentInformation,
        remove: removePaymentInformation,
        fields: fieldsPaymentInformation,
    } = useFieldArray({
        control,
        name: 'paymentInformation'
    })

    const HandleAddPaymentInformation = () => {
        appendPaymentInformation({
            paymentType: '',
            paymentFinancialAcc: '',
            paymentTerms: '',
        })
    }

    return (
        <>
            <div className="pt-[20px]">
                <h1 className="text-2xl font-semibold">Payment Information</h1>
                <div className="w-full h-[1px] bg-gray-300"></div>
                {
                    fieldsPaymentInformation.map((fields, index) => (
                        <div key={fields.id} className="flex flex-rol w-full items-center">
                            <div className="flex-1 gap-8 md:grid md:grid-cols-3 p-[20px]">
                                <FormField
                                    control={form.control}
                                    name={`paymentInformation.${index}.paymentType`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Type</FormLabel>
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
                                    name={`paymentInformation.${index}.paymentFinancialAcc`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Financial Account</FormLabel>
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
                                    name={`paymentInformation.${index}.paymentTerms`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Terms</FormLabel>
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
                            <div className="self-end pb-[20px]">
                                {index === 0 ?
                                    <button onClick={() => { HandleAddPaymentInformation() }} className="bg-black text-white rounded-full w-[35px] h-[35px] hover:bg-gray-700">+</button>
                                    :
                                    <button onClick={() => { removePaymentInformation(index) }} className=" rounded-full border bg-white text-black w-[35px] h-[35px] hover:bg-gray-200">-</button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="pt-[20px]">
                <h1 className="text-2xl font-semibold">Prepaid Payment Information</h1>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="flex flex-rol w-full items-center">
                    <div className="flex-1 gap-8 md:grid md:grid-cols-3 p-[20px]">

                        <FormField
                            control={form.control}
                            name={"paymentInvoiceId"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Invoice ID</FormLabel>
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
                            name={"paymentAmount"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Amount</FormLabel>
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
                            name="paymentIssuedDateTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issued Date Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='date'
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-[35px] h-[35px]"></div>
                </div>
            </div>
        </>
    )
}