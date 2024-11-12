import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { useEffect, useState } from "react";
import tick from '@/public/Done.png'
import { RegisterFormValues, RegisterUserAdminFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";


export default function RegisterUserStep3Admin({ form, packageData, subscribeDurationData }: { form: UseFormReturn<RegisterUserAdminFormValues>, packageData: any, subscribeDurationData: any }) {
    const t = useTranslations()

    const [selectPackage, setSelectPackage] = useState<number>();
    const [packageListData, setPackageListData] = useState<any>()
    const [subscribeDurationListData, setSubscribeDurationListData] = useState<any>()
    const [selectDuration, setSelectDuration] = useState<any>('M3')


    useEffect(() => {
        setSelectPackage(form.getValues('package'));
    }, [])

    useEffect(() => {
        setPackageListData(packageData)
        setSubscribeDurationListData(subscribeDurationData)
    }, [packageData, subscribeDurationData])

    useEffect(() => {
        if (form.getValues('subscribeDuration') !== null && form.getValues('subscribeDuration') !== undefined) {
            setSelectDuration(form.getValues('subscribeDuration'))
        }
    }, [])

    useEffect(() => {
        form.setValue('subscribeDuration', selectDuration)
    }, [selectDuration])

    const HandlePackageSelect = (selection: number) => {
        setSelectPackage(selection)
        form.setValue("package", selection)
    }

    const HandleSelectSubDuration = (data: any) => {
        form.setValue('subscribeDuration', data)
        setSelectDuration(data)
    }

    const PackageSelection = ({ id, title, price, content, onClick }: { id: number, title: string, price: string, content: any, onClick: () => void }) => {
        return (
            <>
                <div className={`flex border rounded-md justify-center items-center w-full shadow-lg ${id == selectPackage && "ring-2 ring-blue-800"} `}>
                    <div className="min-h-[480px] w-[250px] flex-auto flex flex-col justify-between">
                        <div className="p-[10px]">
                            <div className="flex flex-col items-center justify-center pt-[10px]">
                                <h1 className="text-2xl">{title}</h1>
                                <h1 className="text-2xl font-medium pt-[20px]">RM {price}</h1>
                                <p className="mt-[5px]">per package/month</p>
                            </div>
                            <div className="grid grid-cols-3">
                                {content.map((data: any, index: number) => (
                                    <div key={index} className="flex items-center col-span-3 pt-[20px]">
                                        <div className="mr-[5px] min-w-[30px]">
                                            <Image src={tick} alt="tick" height={30} width={30} />
                                        </div>
                                        <div className="text-base text-balance">
                                            {data}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pb-[20px]">
                            <Button className={`rounded-lg bg-gray-400 hover:bg-blue-900 px-[20px] py-[5px] text-white ${id == selectPackage && "bg-blue-800"}`} onClick={onClick}>Subscribe</Button>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    return (
        <>
            <div>
                <h1>Package Duration</h1>
                {
                    <Tabs value={selectDuration} onValueChange={(value) => { HandleSelectSubDuration(value) }}>
                        <TabsList>
                            {
                                subscribeDurationListData?.map((res: any, index: number) => (
                                    <TabsTrigger key={index} value={res.subscriptionPeriodCode}>{res.subscriptionPeriodMsgTag}</TabsTrigger>
                                ))
                            }
                        </TabsList>
                    </Tabs>
                }
            </div>
            <FormField
                name='package'
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="md:flex md:flex-row justify-around w-full md:grid-col-3 ">
                                {
                                    packageListData?.packageList.map((res: any, index: number) => {
                                        return <div key={index}>
                                            <PackageSelection id={res.PackageIdentifier} title={res.PackageName} price={res.PackagePrice} content={res.Descriptions} onClick={() => HandlePackageSelect(res.PackageIdentifier)} />
                                        </div>
                                    })
                                }
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

