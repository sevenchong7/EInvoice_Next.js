'use client';
import { useStore } from "@/action/action";
import { companys } from "@/constants/data";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import noSubImage from "@/public/noSubscription.png"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomeModal } from "../modal/custome-modal";

export default function Subscriptions() {
    const router = useRouter()
    const { updateSubscription, setCompany, company } = useStore();
    const [unSubscribeModal, setUnSubscribeModal] = useState(false);
    const [subscriptionModal, setSubscriptionModal] = useState(false);
    const [loading, setloading] = useState(false);
    const [selectSubscription, setSelectSubscription] = useState('');


    useEffect(() => {
        setCompany(companys)
    }, [])

    const HandleUnsubscribe = () => {
        updateSubscription(undefined)
        router.push('/dashboard/profile/subscription/information')
    }

    const HandleSubscribe = (sub: string) => {
        setSubscriptionModal(true)
        setSelectSubscription(sub)
        // setloading(true)
        // router.push('/dashboard/profile/subscription/payment')
        // setloading(false)
        // updateSubscription(sub)
    }

    const HandleSubscriptionMadal = () => {
        router.push(`/dashboard/profile/subscription/payment?sub=${selectSubscription}`)
    }

    return (
        <>
            <CustomeModal
                isOpen={unSubscribeModal}
                onClose={() => setUnSubscribeModal(false)}
                loading={false}
                title={'Do you want to unsubscribe ?'}
                titleClassName={'text-2xl font-medium items-center'}
                content={
                    <>
                        <div>
                            <div className=" flex justify-center items-center text-center">
                                If you proceed, all function associated with this package <br /> will no longer be available.
                            </div>
                            <div className="flex w-full justify-between items-center pt-10">
                                <Button onClick={() => setUnSubscribeModal(false)} className="bg-gray-400 hover:bg-gray-300">Cancel</Button>
                                <Button onClick={() => HandleUnsubscribe()} className="bg-blue-800 hover:bg-blue-600">Confirm</Button>
                            </div>
                        </div>
                    </>
                }
            />

            <CustomeModal
                isOpen={subscriptionModal}
                onClose={() => setSubscriptionModal(false)}
                loading={false}
                title={'Subscription Change Confirmation?'}
                titleClassName={'text-2xl font-medium items-center'}
                content={
                    <>
                        <div>
                            <div className=" flex justify-center items-center text-center">
                                You are about to change your subscription package.<br /> This will adjust the functions available to you.
                                <br />
                                <br />
                                Please confirm your decision to proceed with this change.
                            </div>
                            <div className="flex w-full justify-between items-center pt-10">
                                <Button onClick={() => setSubscriptionModal(false)} className="bg-gray-400 hover:bg-gray-300">Cancel</Button>
                                <Button onClick={() => HandleSubscriptionMadal()} className="bg-blue-800 hover:bg-blue-600">Confirm</Button>
                            </div>
                        </div>
                    </>
                }
            />

            <div className='flex flex-col h-full overflow-y-scroll space-y-5'>
                <div className='flex flex-col flex-1 h-full '>
                    <div className="flex items-center justify-between mb-[10px]">
                        <Heading title="Subscriptions" description="Manage your access to various packages and services" />
                    </div>
                    <Separator />
                </div>
                {
                    company.subscription != undefined && company.subscription != null && company.subscription != '' &&
                    <div className="space-y-5">
                        <h1 className="text-5xl font-bold">Current Plan</h1>
                        <div className="bg-blue-900 text-white rounded-t-lg shadow-md shadow-black/50">
                            <div className="p-5">
                                <h1 className="text-5xl font-bold">{company.subscription}</h1>
                            </div>
                            <div className="bg-gray-400 text-black px-5 ">
                                <div className="grid gap-4 grid-rows-4 py-10 space-y-3">
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                </div>
                                <div className="flex justify-end py-4">
                                    <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => setUnSubscribeModal(true)}>Unsubscribe</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <h1 className="text-5xl font-bold">Available Plan</h1>
                {
                    company.subscription != 'Free' &&
                    <div className="bg-gray-300 text-black rounded-t-lg shadow-md shadow-black/50">
                        <div className="p-5">
                            <h1 className="text-5xl font-bold">Free</h1>
                        </div>
                        <div className="bg-white border border-black text-black px-5 ">
                            <div className="grid gap-4 grid-rows-4 py-10 space-y-3">
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                            </div>
                            <div className="flex justify-end py-4">
                                <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => HandleSubscribe('Free')}>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                }
                {
                    company.subscription != 'Standard' &&
                    <div className="bg-gray-300 text-black rounded-t-lg shadow-md shadow-black/50">
                        <div className="p-5">
                            <h1 className="text-5xl font-bold">Standard</h1>
                        </div>
                        <div className="bg-white border border-black text-black px-5 ">
                            <div className="grid gap-4 grid-rows-4 py-10 space-y-3">
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                            </div>
                            <div className="flex justify-end py-4">
                                <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => HandleSubscribe('Standard')}>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                }
                {
                    company.subscription != 'Premium' &&
                    <div className="bg-gray-300 text-black rounded-t-lg shadow-md shadow-black/50">
                        <div className="p-5">
                            <h1 className="text-5xl font-bold">Premium</h1>
                        </div>
                        <div className="bg-white border border-black text-black px-5 ">
                            <div className="grid gap-4 grid-rows-4 py-10 space-y-3">
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                            </div>
                            <div className="flex justify-end py-4">
                                <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => HandleSubscribe('Premium')}>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                }
            </div >

        </>
    )
}