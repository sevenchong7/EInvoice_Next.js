import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import eghl from '@/public/eGHL.png'
import rm from '@/public/RM.png'
import { useEffect, useState } from "react";
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import React from "react";

export default function RegisterUserStep4(
    {
        form,
        paymentMethodData,
        packageData,
        subscriptionDurationLisstData
    }: {
        form: UseFormReturn<RegisterFormValues>,
        paymentMethodData: any,
        packageData: any,
        subscriptionDurationLisstData: any
    }) {
    const [payment, setPayment] = useState<any>()
    const [paymentmethod, setPaymentMethod] = useState<any>()

    const HandlePayment = (selection: number) => {
        setPayment(selection)
        form.setValue('paymentMethod', selection)
    }

    useEffect(() => {
        setPaymentMethod(paymentMethodData.content)
    }, [paymentMethodData])


    const PaymentMethod = () => {
        return (
            <>
                <div className='pt-[30px] space-y-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-semibold'>Payment Method:</h1>
                    </div>
                    {paymentmethod?.map((res: any, index: number) => {
                        console.log('imagePath = ', res.imagePath)
                        return <div key={index}>
                            {
                                res.paymentMethodDisplayName != 'E-WALLET' &&
                                <PaymentButton key={index} id={res.id} payment={payment} src={res.imagePath} name={res.paymentMethodDisplayName} onClick={() => HandlePayment(res.id)} />
                            }
                        </div>
                    })}
                    {/* <PaymentButton id={"eghl"} payment={payment} src={eghl} name={"EGHL"} onClick={() => HandlePayment('eghl')} />
                    <PaymentButton id={"rm"} payment={payment} src={rm} name={"Revenue Monster"} onClick={() => HandlePayment('rm')} /> */}
                </div>
            </>
        )
    }

    // const PricingList = ({ selectedPricing, setSelectedPricing,id }: { selectedPricing: any, setSelectedPricing: any }) => {
    //     return (
    //         <div className="flex-1 border rounded-md">

    //         </div>
    //     )
    // }

    return (
        <>
            <FormField
                name='paymentMethod'
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div>
                                <div className="flex flex-row justify-evenly w-full grid-col-none ">

                                </div>
                                <Summary form={form} packageData={packageData} subscriptionDurationLisstData={subscriptionDurationLisstData} />
                                {
                                    form.getValues('package') !== 1 &&
                                    <PaymentMethod />
                                }
                            </div>
                        </FormControl>
                        {
                            form.getValues('package') !== 1 &&
                            <div className='flex item-center justify-center'>
                                <FormMessage />
                            </div>
                        }
                    </FormItem>
                )}
            />
        </>
    )
}

const PaymentButton = ({ id, payment, src, name, onClick, }: { id: string, payment: string, src: any, name: string, onClick: () => void }) => {
    return (
        <>
            <button className={`w-full border rounded-lg shadow-lg ${payment == id && "ring-2 ring-blue-800"}`} onClick={onClick}>
                <div className='pl-[20px] flex py-1'>
                    <Image src={src} alt={`${src}`} height={80} width={80} className='pr-[20px]' priority={true} />
                    <div className='flex flex-col item-center justify-center'>
                        <h1 className='text-2xl font-semibold'>{name}</h1>
                    </div>
                </div>
            </button>
        </>
    )
}

const Summary = ({ form, packageData, subscriptionDurationLisstData }: { form: UseFormReturn<RegisterFormValues>, packageData: any, subscriptionDurationLisstData: any }) => {
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