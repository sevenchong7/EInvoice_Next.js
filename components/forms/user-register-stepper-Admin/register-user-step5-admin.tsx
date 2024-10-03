import approve from '@/public/Approval.png'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

export default function RegisterUserStep5Admin() {
    const t = useTranslations()
    return (
        <>
            <div className="flex flex-col h-full items-center justify-center mx-auto">
                <Image src={approve} alt='approve' />
                <h1>{t('TAG_SUCCESS_TITLE')}</h1>
                <p className="text-gray-400 text-sm">{t('TAG_SUCCESS_DESC')}</p>
            </div>
        </>
    )
}