import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import eghl from '@/public/eGHL.png'
import rm from '@/public/RM.png'
import { useState } from "react";
import { RegisterFormValues } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";

export default function RegisterUserStep4({ form }: { form: UseFormReturn<RegisterFormValues> }) {
    const [payment, setPayment] = useState('')

    const HandlePayment = (selection: string) => {
        console.log('payment selection : ', selection)
        setPayment(selection)
        form.setValue('paymentMethod', selection)
    }

    const PaymentMethod = () => {
        return (
            <>
                <div className='pt-[30px] space-y-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-semibold'>Payment Method:</h1>
                    </div>
                    <PaymentButton id={"eghl"} payment={payment} src={eghl} name={"EGHL"} onClick={() => HandlePayment('eghl')} />
                    <PaymentButton id={"rm"} payment={payment} src={rm} name={"Revenue Monster"} onClick={() => HandlePayment('rm')} />
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
                                <Summary />
                                <PaymentMethod />
                            </div>
                        </FormControl>
                        <div className='flex item-center justify-center'>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
        </>
    )
}

const PaymentButton = ({ id, payment, src, name, onClick }: { id: string, payment: string, src: any, name: string, onClick: () => void }) => {
    return (
        <>
            <button className={`w-full border rounded-lg shadow-lg ${payment == id && "ring-2 ring-blue-800"}`} onClick={onClick}>
                <div className='pl-[20px] flex py-1'>
                    <Image src={src} alt={`${src}`} className='pr-[20px]' />
                    <div className='flex flex-col item-center justify-center'>
                        <h1 className='text-2xl font-semibold'>{name}</h1>
                    </div>
                </div>
            </button>
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