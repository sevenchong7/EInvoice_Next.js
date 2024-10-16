'use client';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { getLanguage } from '@/lib/services/generalService';
import { useEffect, useState } from 'react';

export default function LocaleSwitcher() {
    const t = useTranslations('TAG_LOCALE_SWITCHER');
    const locale = useLocale();
    const [languageData, setLanguageData] = useState()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const GetLanguage = async () => {
            const lanData = await getLanguage()
            setLanguageData(lanData)
        }
        GetLanguage()

    }, [open])

    useEffect(() => {
        console.log('languageData = ', languageData)
    }, [languageData])

    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            items={languageData}
            label={t('TAG_LABLE')}
        />
    );
}