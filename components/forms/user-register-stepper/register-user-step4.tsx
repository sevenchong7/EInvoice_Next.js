import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { getpaymentMethod } from "@/lib/services/generalService";
import { useTranslations } from "next-intl";
import { PaymentButton } from "@/components/paymentButton";
import { Summary } from "@/components/summary";

export default function RegisterUserStep4(
    {
        form,
        packageData,
        subscriptionDurationLisstData
    }: {
        form: UseFormReturn<RegisterFormValues>,
        packageData: any,
        subscriptionDurationLisstData: any
    }) {
    const [payment, setPayment] = useState<any>()
    const [paymentmethod, setPaymentMethod] = useState<any>()

    const HandlePayment = (selection: number) => {
        setPayment(selection)
        form.setValue('paymentMethod', selection)
    }

    //The reason why this api put here is becasue if put in page(server side) cant get image url
    const GetpaymentMethod = async () => {
        const paymentMethodListData = await getpaymentMethod()
        setPaymentMethod(paymentMethodListData)
    }

    useEffect(() => {
        GetpaymentMethod()
    }, [])


    const PaymentMethod = () => {
        return (
            <>
                <div className='pt-[30px] space-y-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-semibold'>Payment Method:</h1>
                    </div>
                    {paymentmethod?.content?.map((res: any, index: number) => {
                        // console.log('res imagePath = ', res)
                        // console.log('imagePath = ', res.imagePath)
                        return <div key={index}>
                            {
                                res.paymentMethodDisplayName != 'E-WALLET' &&
                                <PaymentButton key={index} id={res.id} payment={payment} src={res.imagePath} name={res.paymentMethodDisplayName} onClick={() => HandlePayment(res.id)} />
                            }
                        </div>
                    })}
                </div>
            </>
        )
    }

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
                                <Summary form={form} packageData={packageData} subscriptionDurationListData={subscriptionDurationLisstData} />
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