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
import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { number } from "zod";
import FileUpload from "@/components/file-upload";
import { useTranslations } from "next-intl";
import React from "react";

export default function RegisterUserStep4Admin(
    {
        form,
        paymentMethodData,
        paymentTypeData,
        subscriptionDurationLisstData
    }: {
        paymentMethodData: any
        paymentTypeData: any
        form: UseFormReturn<RegisterUserAdminFormValues>;
        subscriptionDurationLisstData: any
    }) {

    const [loading, setLoading] = useState(false);
    const t = useTranslations()
    const [selectedImage, setSelectedImage] = useState<File[][] | undefined>([]);



    // const handleImageUpload = async (event) => {
    //     const file = event.target.files[0];
    //     const formData = new FormData();
    //     formData.append('image', file);

    //     try {
    //         const response = await axios.post('/api/enhance-image', formData);
    //         // Handle the enhanced image response here
    //         console.log('Enhanced image:', response.data);
    //         // Update state or display the enhanced image
    //     } catch (error) {
    //         console.error('Error enhancing image:', error);
    //     }
    // };

    const {
        control,
        formState: { errors },
        watch
    } = form;

    const { append, remove, fields } = useFieldArray({
        control,
        name: 'payment'
    });

    useEffect(() => {
        // if (form.getValues('package') === '1') {
        //     fields?.map((field, index) => {
        //         form.setValue(`payment.${index}.paymentMethod`, )
        //         form.setValue(`payment.${index}.paymentAmount`, )
        //     })
        // }

        form.getValues('payment').forEach((payment, index) => {
            const imgUrls = form.getValues(`payment.${index}.imgUrl`);

            setSelectedImage((prevSelectedImage) => {
                const updatedSelectedImage = [...(prevSelectedImage || [])]; // Ensure the previous array exists or is empty
                updatedSelectedImage[index] = imgUrls; // Set images for the current payment index
                return updatedSelectedImage; // Return the updated state
            });
        });

    }, [])


    const HandleUploadImage = (imageData: any, index: number) => {
        const files = imageData.target.files;

        if (files) {
            const filesArray: File[] = files ? Array.from(files) : [];
            setSelectedImage((prev) => {
                const updatedImages = prev ? [...prev] : [];
                updatedImages[index] = filesArray;
                return updatedImages;
            });

            form.setValue(`payment.${index}.imgUrl`, filesArray);
        }
    }

    const handleRemoveFile = (index: number, indexToRemove: number) => {
        const currentFiles = form.getValues(`payment.${index}.imgUrl`);
        setSelectedImage((prev) => {
            if (!prev) return prev;

            const updatedFiles = prev.map((files, preindex) => {
                if (preindex === index) {
                    return files.filter((_, i) => i !== indexToRemove);
                }
                return files;
            });

            return updatedFiles.filter((files) => files.length > 0);
        });


        if (currentFiles) {
            const updatedFiles = currentFiles.filter((_: any, currentIndex: number) => currentIndex !== indexToRemove);
            form.setValue(`payment.${index}.imgUrl`, updatedFiles);
        }
    };

    return (
        <>
            <div className="flex flex-col w-3/4 items-center justify-center mx-auto">
                <Summary form={form} packageData={form.getValues('package')} subscriptionDurationLisstData={subscriptionDurationLisstData} />
                {
                    form.getValues('package') !== 1 &&
                    <div className="w-full pt-[20px]">
                        {fields?.map((_, index) => (
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="item-1"
                                key={index}
                            >
                                <AccordionItem value="item-1" className="flex flex-col w-full">
                                    <div className="flex items-center space-x-5 justify-between">
                                        <AccordionTrigger
                                            className={cn(
                                                'flex grow !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden',
                                                errors?.payment?.[index] && 'text-red-700'
                                            )}
                                        >
                                            <h1 className="flex md:text-2xl text-base">
                                                {`${t('TAG_PAYMENT_METHOD')} ${index + 1}`}
                                            </h1>

                                            {errors?.payment?.[index] && (
                                                <span className="alert absolute right-8">
                                                    <AlertTriangleIcon className="h-4 w-4 text-red-700" />
                                                </span>
                                            )}
                                        </AccordionTrigger>
                                        {index !== 0 && (
                                            <div className="flex justify-end items-end">
                                                <Button
                                                    // variant="outline"
                                                    // size="icon"
                                                    className=""
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash2Icon className="h-4 w-4 " />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
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
                                                        <FormLabel>{t('TAG_PAYMENT_METHOD')} *</FormLabel>
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue
                                                                        // defaultValue={field.value}
                                                                        placeholder="Select a Payment Type"
                                                                    />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className='max-h-[300px] overflow-y-scroll'>
                                                                {paymentTypeData?.map((res: any, index: number) => (
                                                                    <SelectItem key={index} value={res.paymentMethodCode}>
                                                                        {res.paymentMethodDisplayName}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>

                                                        </Select>
                                                        {/* <Input
                                                                type="text"
                                                                disabled={loading}
                                                                {...field}
                                                            /> */}
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`payment.${index}.paymentAmount`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('TAG_PAYMENT_AMOUNT')}*</FormLabel>
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
                                                        <FormLabel>{t('TAG_REFERENCE_NO')}.</FormLabel>
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

                                            <div className="lg:w-3/4 col-span-3 mx-auto space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name={`payment.${index}.imgUrl`}
                                                    render={({ field }) => (
                                                        <FormItem >
                                                            <FormLabel htmlFor={index.toString()} className="flex custom-file-upload border w-full p-3 rounded-lg">Choose Files: {selectedImage?.[index] != undefined ? selectedImage?.[index]?.length > 0 ? selectedImage[index].length + " file" : "No File Selected" : "No File Selected"}</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="file"
                                                                    disabled={loading}
                                                                    // multiple
                                                                    onChange={(e) => HandleUploadImage(e, index)}
                                                                    style={{ display: 'none' }}
                                                                    className="hidden-file-input"
                                                                    id={index.toString()}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div>
                                                    {
                                                        selectedImage?.[index]?.map((file: any, fileIndex: number) => (
                                                            <div className="space-x-5 space-y-1 flex w-full items-end" key={fileIndex}>
                                                                <p>{fileIndex + 1}.</p>
                                                                <p className="text-nowrap"> {file.name} </p>
                                                                <div className="flex justify-end w-full">
                                                                    <button className="bg-red-500 p-1 rounded text-white" onClick={() => handleRemoveFile(index, fileIndex)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
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
                                {t('TAG_ADD_MORE')}
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

const Summary = ({ form, packageData, subscriptionDurationLisstData }: { form: UseFormReturn<RegisterUserAdminFormValues>, packageData: any, subscriptionDurationLisstData: any }) => {
    console.log('subscriptionDurationLisstData = ', subscriptionDurationLisstData)
    console.log('packageData = ', packageData)
    console.log('subscribeDuration = ', form.getValues('subscribeDuration'))
    console.log('package = ', form.getValues('package'))


    const formpackage = form.getValues('package')
    const subDuration = form.getValues('subscribeDuration')

    return (
        <>
            {/* packageList */}
            <div className='border rounded-lg w-full shadow-xl'>
                <div className='p-[20px]'>
                    <div className=' flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>Summary</h1>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>{packageData.packageList.map((res: any) => (formpackage == res.PackageIdentifier && res.PackageName))} Package</h2>
                            <p className='text-gray-400'>{subscriptionDurationLisstData?.map((res: any) => (res.subscriptionPeriodCode === subDuration && res.subscriptionPeriodMsgTag))}</p>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageData.packageList.map((res: any) => (formpackage == res.PackageIdentifier && res.pricingList[subDuration!]))} </h1>
                        </div>
                    </div>

                    {/* <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div> */}

                    {/* <div className='grid grid-cols-4 pt-[10px]'>
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
                    </div> */}

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Total</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageData.packageList.map((res: any) => (formpackage == res.PackageIdentifier && res.pricingList[subDuration!]))}</h1>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}