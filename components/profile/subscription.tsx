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
import { useTranslations } from "next-intl";

export default function Subscriptions() {
    const router = useRouter()
    const t = useTranslations()
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
                title={t('TAG_UNSUBSCRIBE_MODAL_TITLE')}
                titleClassName={'text-2xl font-medium items-center'}
                content={
                    <>
                        <div>
                            <div className=" flex justify-center items-center text-center">
                                {t('TAG_UNSUBSCRIBE_MODAL_DESC')}
                            </div>
                            <div className="flex w-full justify-between items-center pt-10">
                                <Button onClick={() => setUnSubscribeModal(false)} className="bg-gray-400 hover:bg-gray-300">{t('TAG_CANCEL')}</Button>
                                <Button onClick={() => HandleUnsubscribe()} className="bg-blue-800 hover:bg-blue-600">{t('TAG_CONFIRM')}</Button>
                            </div>
                        </div>
                    </>
                }
            />

            <CustomeModal
                isOpen={subscriptionModal}
                onClose={() => setSubscriptionModal(false)}
                loading={false}
                title={t('TAG_SUBSCRIBE_MODAL_TITLE')}
                titleClassName={'text-2xl font-medium items-center'}
                content={
                    <>
                        <div>
                            <div className=" flex justify-center items-center text-center">
                                {t('TAG_SUBSCRIBE_MODAL_DESC')}
                            </div>
                            <div className="flex w-full justify-between items-center pt-10">
                                <Button onClick={() => setSubscriptionModal(false)} className="bg-gray-400 hover:bg-gray-300">{t('TAG_CANCEL')}</Button>
                                <Button onClick={() => HandleSubscriptionMadal()} className="bg-blue-800 hover:bg-blue-600">{t('TAG_CONFIRM')}</Button>
                            </div>
                        </div>
                    </>
                }
            />

            <div className='flex flex-col h-full overflow-y-scroll space-y-5'>
                <div className='flex flex-col flex-1 h-full '>
                    <div className="flex items-center justify-between mb-[10px]">
                        <Heading title={t('TAG_SUBSCRIPTIONS')} description={t('TAG_SUBSCRIPTIONS_DESC')} />
                    </div>
                    <Separator />
                </div>
                {
                    company.subscription != undefined && company.subscription != null && company.subscription != '' &&
                    <div className="space-y-5">
                        <h1 className="text-3xl font-bold">{t('TAG_CURRENT_PLAN')}</h1>
                        <div className="bg-blue-900 text-white rounded-t-lg shadow-md shadow-black/50">
                            <div className="p-3 pl-5">
                                <h1 className="text-3xl font-bold">{company.subscription}</h1>
                            </div>
                            <div className="bg-gray-400 text-black px-5 ">
                                <div className="grid gap-2 grid-rows-4 py-4 space-y-1 text-lg font-semibold">
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800 dark:text-blue-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800 dark:text-blue-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800 dark:text-blue-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-blue-800 dark:text-blue-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                    </div>
                                </div>
                                <div className="flex justify-end py-2">
                                    <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => setUnSubscribeModal(true)}>{t('TAG_UNSUBSCRIBE')}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <h1 className="text-3xl font-bold">{t('TAG_AVAILABLE_PLAN')}</h1>
                {
                    company.subscription != 'Free' &&
                    <div className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white rounded-t-lg shadow-md shadow-gray-500/50">
                        <div className="p-3 pl-5">
                            <h1 className="text-3xl font-bold">{t('TAG_FREE')}</h1>
                        </div>
                        <div className="bg-white dark:bg-gray-600 dark:text-white border-x border-b border-black text-black px-5 ">
                            <div className="grid gap-2 grid-rows-4 py-4 space-y-1 text-lg font-semibold">
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                            </div>
                            <div className="flex justify-end py-2">
                                <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => HandleSubscribe('Free')}>{t('TAG_SUBSCRIBE')}</Button>
                            </div>
                        </div>
                    </div>
                }
                {
                    company.subscription != 'Standard' &&
                    <div className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white rounded-t-lg shadow-md shadow-gray-500/50">
                        <div className="p-3 pl-5">
                            <h1 className="text-3xl font-bold">{t('TAG_STANDARD')}</h1>
                        </div>
                        <div className="bg-white dark:bg-gray-600 dark:text-white border-x border-b border-black text-black px-5 ">
                            <div className="grid gap-2 grid-rows-4 py-4 space-y-1 text-lg font-semibold">
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                            </div>
                            <div className="flex justify-end py-2">
                                <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => HandleSubscribe('Standard')}>{t('TAG_SUBSCRIBE')}</Button>
                            </div>
                        </div>
                    </div>
                }
                {
                    company.subscription != 'Premium' &&
                    <div className="bg-gray-300 dark:bg-gray-800 dark:text-white text-black rounded-t-lg shadow-md shadow-gray-500/50">
                        <div className="p-3 pl-5">
                            <h1 className="text-3xl font-bold">{t('TAG_PREMIUM')}</h1>
                        </div>
                        <div className="bg-white dark:bg-gray-600 dark:text-white border-x border-b border-black text-black px-5 ">
                            <div className="grid gap-2 grid-rows-4 py-4 space-y-1 text-lg font-semibold">
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-blue-800 dark:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <h1 className="">Corporate Tax Filing(for SMEs)</h1>
                                </div>
                            </div>
                            <div className="flex justify-end py-2">
                                <Button className="bg-blue-900 hover:bg-blue-700" onClick={() => HandleSubscribe('Premium')}>{t('TAG_SUBSCRIBE')}</Button>
                            </div>
                        </div>
                    </div>
                }
            </div >

        </>
    )
}