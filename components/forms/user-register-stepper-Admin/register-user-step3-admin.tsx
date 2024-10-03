import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { useEffect, useState } from "react";
import tick from '@/public/Done.png'
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import React from "react";

export default function RegisterUserStep3Admin({ form }: { form: UseFormReturn<RegisterUserAdminFormValues> }) {
    const [selectPackage, setSelectPackage] = useState('');
    const t = useTranslations()

    useEffect(() => {
        setSelectPackage(form.getValues('package'));
    }, [])

    const HandlePackageSelect = (selection: string) => {
        setSelectPackage(selection)
        form.setValue("package", selection)
    }

    const PackageSelection = ({ id, title, price, content, onClick }: { id: string, title: string, price: string, content: string[], onClick: () => void }) => {
        return (
            <>
                <div className={`flex border rounded-md justify-center items-center w-full shadow-lg ${id == selectPackage && "ring-2 ring-blue-800"} `}>
                    <div className="min-h-[480px] w-[270px] flex flex-col justify-between">
                        <div className="p-[10px]">
                            <div className="flex flex-col items-center justify-center pt-[10px]">
                                <h1 className="text-2xl">{title}</h1>
                                <h1 className="text-2xl font-medium pt-[20px]">{price}</h1>
                                <p className="mt-[5px]">{t('TAG_PER_PACKAGE_MONTH')}</p>
                            </div>
                            <div className="grid grid-cols-3">
                                {content.map((item, index) => (
                                    <div key={index} className="flex items-center col-span-3 pt-[20px]">
                                        <div className="mr-[5px] min-w-[30px]">
                                            <Image src={tick} alt="tick" height={30} width={30} />
                                        </div>
                                        <div className="text-base text-balance">
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pb-[20px]">
                            <Button className={`rounded-lg bg-gray-400 px-[20px] py-[5px] text-white ${id == selectPackage && "bg-blue-800"}`} onClick={onClick}>{t('TAG_SUBSCRIBE')}</Button>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    return (
        <>
            <FormField
                name='package'
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="md:flex md:flex-row justify-around w-full md:grid-col-3 ">
                                <div className='col-span-1 mr-[20px]'>
                                    <PackageSelection id='1' title='test' price='test' content={['test', 'test', 'test', 'test', 'test']} onClick={() => HandlePackageSelect("1")} />
                                </div>
                                <div className='col-span-1 mr-[20px]'>
                                    <PackageSelection id='2' title='test' price='test' content={['test test test test test test test test']} onClick={() => HandlePackageSelect("2")} />
                                </div>
                                <div className='col-span-1 mr-[20px]'>
                                    <PackageSelection id='3' title='test' price='test' content={['test']} onClick={() => HandlePackageSelect("3")} />
                                </div>
                            </div>
                        </FormControl>
                        <div className='flex item-center justify-center pt-[20px]'>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
        </>
    )
}
