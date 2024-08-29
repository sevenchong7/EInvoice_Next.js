'use client';
import Image from "next/image";
import eghl from '@/public/eGHL.png'
import rm from '@/public/RM.png'
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { number } from "zod";
import FileUpload from "@/components/file-upload";

export default function RegisterUserStep4Admin(
    {
        form, append, remove, fields
    }: {
        form: UseFormReturn<RegisterUserAdminFormValues>;
        append: UseFieldArrayAppend<RegisterUserAdminFormValues, 'payment'>;
        remove: UseFieldArrayRemove;
        fields: FieldArrayWithId<RegisterUserAdminFormValues, 'payment'>[]
    }) {

    const [loading, setLoading] = useState(false);

    const {
        control,
        formState: { errors }
    } = form;

    return (
        <>
            <div className="flex flex-col w-3/4 items-center justify-center mx-auto">
                <Summary />
                <div className="w-full pt-[20px]">
                    {fields?.map((field, index) => (
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="item-1"
                            key={field.id}
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger
                                    className={cn(
                                        'relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden',
                                        errors?.payment?.[index] && 'text-red-700'
                                    )}
                                >
                                    <h1 className="text-2xl">
                                        {`Payment Method ${index + 1}`}
                                    </h1>

                                    <Button
                                        // variant="outline"
                                        // size="icon"
                                        className="absolute right-8"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2Icon className="h-4 w-4 " />
                                    </Button>
                                    {errors?.payment?.[index] && (
                                        <span className="alert absolute right-8">
                                            <AlertTriangleIcon className="h-4 w-4 text-red-700" />
                                        </span>
                                    )}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div
                                        className={cn(
                                            'relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3'
                                        )}
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`payment.${index}.paymentMethod`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Method*</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
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
                                            name={`payment.${index}.paymentAmount`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Amount*</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
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
                                            name={`payment.${index}.referenceNo`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Reference No.</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            disabled={loading}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="w-3/4 col-span-3 mx-auto">
                                            <FormField
                                                control={form.control}
                                                name={`payment.${index}.imgUrl`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <FileUpload
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                                onRemove={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    ))}

                    <div className="mt-4 flex justify-center">
                        <Button
                            type="button"
                            className="flex justify-center"
                            // size={'lg'}
                            onClick={() =>
                                append({
                                    paymentMethod: '',
                                    paymentAmount: 0,
                                    referenceNo: '',
                                    imgUrl: [],
                                })
                            }
                        >
                            Add More
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

const Summary = ({ }) => {
    return (
        <>
            <div className='border rounded-lg w-full shadow-xl'>
                <div className='p-[20px]'>
                    <div className=' flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>Summary</h1>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Standard Package</h2>
                            <p className='text-gray-400'>test</p>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM 100</h1>
                        </div>
                    </div>

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Sub Total</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM 100</h1>
                        </div>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>SST 6%</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM 100</h1>
                        </div>
                    </div>

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Total</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM 100</h1>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}