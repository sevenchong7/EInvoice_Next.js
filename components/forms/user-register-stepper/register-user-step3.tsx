'use client'
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { useEffect, useState } from "react";
import tick from '@/public/Done.png'
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import React from "react";

export default function RegisterUserStep3({ form, packageData, selectDuration, subscriptionDurationListData }: { form: UseFormReturn<RegisterFormValues>, packageData: any, selectDuration: any, subscriptionDurationListData: any }) {
    const [packageListData, setPackageListData] = useState<any>()
    // const [subscriptionDurationListData, setSubscriptionDurationListData] = useState<any>()
    const [selectPackage, setSelectPackage] = useState<number>();

    useEffect(() => {
        if (form.getValues('package') !== null && form.getValues('package') !== undefined) {
            setSelectPackage(form.getValues('package'));
        }
    }, [])

    useEffect(() => {
        setPackageListData(packageData)
        // setSubscriptionDurationListData(subscriptionDurationData)
        // console.log('packageData = ', packageData)
        // console.log('subscriptionDurationData = ', subscriptionDurationData)

    }, [packageData])

    const HandlePackageSelect = (selection: number) => {
        setSelectPackage(selection)
        form.setValue("package", selection)
    }

    const PackageSelection = ({ data, selectDuration, onClick }: { data: any, selectDuration: any, onClick: () => void }) => {
        return (
            <>
                <div className={`flex border rounded-md justify-center items-center w-full shadow-lg ${data.PackageIdentifier == selectPackage && "ring-2 ring-blue-800"} `}>
                    <div className="min-h-[480px] w-[250px] flex-auto flex flex-col justify-between">
                        <div className="p-[10px]">
                            <div className="flex flex-col items-center justify-center pt-[10px]">
                                <h1 className="text-2xl">{data.PackageName}</h1>
                                <h1 className="text-2xl font-medium pt-[20px]">RM {data.pricingList[selectDuration] ?? 0}</h1>
                                <p className="mt-[5px]">per package/{subscriptionDurationListData.map((res: any) => (res.subscriptionPeriodCode === selectDuration && res.durationInMonths))} month</p>
                            </div>
                            <div className="grid grid-cols-3">
                                {data.Descriptions.map((data: any, index: number) => (
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
                            <Button className={`rounded-lg bg-gray-400 hover:bg-blue-900 px-[20px] py-[5px] text-white ${data.PackageIdentifier == selectPackage && "bg-blue-800"}`} onClick={onClick}>Subscribe</Button>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    return (
        <div className="flex flex-col h-full overscroll-y-auto">
            <FormField
                name='package'
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="lg:flex lg:flex-row lg:justify-evenly lg:w-full grid-col-none">
                                {
                                    !packageListData ?
                                        packageListData?.packageList.map((res: any, index: number) => {
                                            return <div key={index}>
                                                <PackageSelection data={res} selectDuration={selectDuration} onClick={() => HandlePackageSelect(res.PackageIdentifier)} />
                                            </div>
                                        }) : <div className="flex ">
                                            <div className="w-[250px] flex-auto flex  justify-between">
                                                <Button onClick={() => HandlePackageSelect(1)} >1</Button>
                                                <Button onClick={() => HandlePackageSelect(2)} >2</Button>
                                                <Button onClick={() => HandlePackageSelect(3)} >3</Button>
                                            </div>
                                        </div>
                                }
                                {/* <div className='col-span-1 mr-[10px]'>
                                </div>
                                <div className='col-span-1 mr-[10px]'>
                                    <PackageSelection id='1' title='test' price='test' content={['test test test test test test test test test test test test']} onClick={() => HandlePackageSelect("2")} />
                                </div>
                                <div className='col-span-1 mr-[10px]'>
                                    <PackageSelection id='2' title='test' price='test' content={['test']} onClick={() => HandlePackageSelect("3")} />
                                </div> */}
                            </div>
                        </FormControl>
                        <div className='flex item-center justify-center pt-[20px]'>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
        </div>
    )
}
