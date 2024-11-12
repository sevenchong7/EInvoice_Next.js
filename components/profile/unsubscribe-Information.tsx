'use client'
import Image from "next/image";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import unSubImage from '@/public/unSubInfobg.png';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ConfirmButton } from "../ui/confirmButton";

export default function UnsubscribeInformation() {
    const router = useRouter();
    const t = useTranslations()
    return (
        <>
            <div className='flex flex-col h-full space-y-5'>
                <div className='flex flex-col flex-1 h-full '>
                    <div className="flex items-center justify-between mb-[10px]">
                        <Heading title={t('TAG_SUBSCRIPTIONS')} description={t('TAG_SUBSCRIPTIONS_DESC')} />
                    </div>
                    <Separator />
                    <div className="flex flex-col justify-center items-center text-center space-y-5 h-full">
                        <div>
                            <Image src={unSubImage} alt="no_subscription_image" width={400} height={400} />
                        </div>
                        <h1 className="text-3xl font-medium">{t('TAG_SUCCESSFULLY_UNSUBSCRIBE_TITLE')}</h1>
                        <p className="whitespace-pre-wrap">
                            {t('TAG_SUCCESSFULLY_UNSUBSCRIBE_DESC')}
                        </p>
                        <ConfirmButton onClick={() => router.push('/dashboard')} className="bg-blue-900 hover:bg-blue-700">{t('TAG_BACK_TO_HOME')}</ConfirmButton>
                    </div>
                </div>
            </div>
        </>
    )
}