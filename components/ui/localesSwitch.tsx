'use client';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { getLanguage } from '@/lib/services/generalService';
import { useEffect, useState } from 'react';

export default function LocaleSwitcher() {
    const t = useTranslations('TAG_LOCALE_SWITCHER');
    const locale = useLocale();
    const [languageData, setLanguageData] = useState()

    const GetLanguage = async () => {
        return await getLanguage()
    }

    useEffect(() => {
        GetLanguage().then((res) => setLanguageData(res))
    }, [])

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