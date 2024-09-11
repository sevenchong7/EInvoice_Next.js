'use client';
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import Image from "next/image";
import eghl from '@/public/eGHL.png';
import rm from '@/public/RM.png';
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SubscriptionPayment({ subPackage }: { subPackage: string | null }) {
    const router = useRouter();
    const [payment, setPayment] = useState('');

    const HandlePayment = () => {
        // if (payment == '') return

        router.push('/dashboard/profile/subscription/payment/information')
    }

    const PaymentMethod = () => {
        return (
            <>
                <div className='pt-[30px] space-y-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-semibold'>Payment Method:</h1>
                    </div>
                    <PaymentButton id={"eghl"} payment={payment} src={eghl} name={"EGHL"} onClick={() => setPayment('eghl')} />
                    <PaymentButton id={"rm"} payment={payment} src={rm} name={"Revenue Monster"} onClick={() => setPayment('rm')} />
                </div>
            </>
        )
    }

    return (
        <div className='flex flex-col h-full overflow-y-scroll space-y-5'>
            <div className='flex flex-col  '>
                <div className="flex items-center justify-between mb-[10px]">
                    <Heading title="Subscriptions" description="Manage your access to various packages and services" />
                </div>
                <Separator />
            </div>
            <div className="p-1">
                <Summary subPackage={subPackage} />
                {
                    subPackage !== 'Free' &&
                    <PaymentMethod />
                }
            </div>
            <div className="flex flex-col h-full justify-end pb-4">
                <div className="flex flex-row  justify-between items-center">
                    <Button onClick={() => router.back()} className="">Back</Button>
                    <Button onClick={() => HandlePayment()} className="">{subPackage === 'Free' ? "Confirm" : "Continue to Payment"}</Button>
                </div>
            </div>
        </div>
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


const Summary = ({ subPackage }: { subPackage: string | null }) => {
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
                            <h2 className='text-base'>{subPackage} Package</h2>
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