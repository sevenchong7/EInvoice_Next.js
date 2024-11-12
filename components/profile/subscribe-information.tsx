'use client'
import Image from "next/image";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import subImage from '@/public/subInfoBg.png';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ConfirmButton } from "../ui/confirmButton";
import { useTaskStore } from "@/lib/store";

export default function SubscribeInformation() {
    const router = useRouter();
    const t = useTranslations()
    const packageSubStatus = useTaskStore((state) => state.packageSubStatus)
    return (
        <>
            <div className='flex flex-col h-full space-y-5'>
                <div className='flex flex-col flex-1 h-full '>
                    <div className="flex items-center justify-between mb-[10px]">
                        <Heading title={t('TAG_SUBSCRIPTIONS')} description={t('TAG_SUBSCRIPTIONS_DESC')} />
                    </div>
                    <Separator />
                    <div className="flex flex-col h-full my-auto justify-center items-center text-center space-y-5 pt-20">
                        <Image src={subImage} alt="no_subscription_image" width={500} height={500} />
                        {
                            packageSubStatus ?
                                <h1 className="text-3xl font-medium">{t('TAG_SUCCESSFULLY_SUBSCRIBE_TITLE')}</h1>
                                :
                                <h1 className="text-3xl font-medium">{t('TAG_PAYMENT_FAIL')}</h1>

                        }
                        {
                            packageSubStatus ?
                                <p className="text-sm whitespace-pre-wrap">

                                    {t('TAG_SUCCESSFULLY_SUBSCRIBE_DESC')}
                                </p>
                                :
                                <p className="text-sm whitespace-pre-wrap">

                                    {t('TAG_PAYMENT_FAIL_DESC')}
                                </p>

                        }

                        <ConfirmButton onClick={() => router.push('/dashboard')} className="bg-blue-900 hover:bg-blue-700">{t('TAG_BACK_TO_HOME')}</ConfirmButton>
                    </div>
                </div>
            </div>
        </>
    )
}