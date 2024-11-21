'use client';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { useEffect, useState } from 'react';
import { getLanguage } from '@/lib/services/userService';
import { useUserTaskStore } from '@/lib/store/userStore';

export default function LocaleSwitcher() {
    const t = useTranslations('TAG_LOCALE_SWITCHER');
    const locale = useLocale();
    const setLanguage = useUserTaskStore((state) => state.setGetLanguageList) //Store or Redux
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const GetLanguage = async () => {
            const lanData = await getLanguage()
            //set the value get in to the Redux
            setLanguage(lanData)
        }

        GetLanguage()

    }, [open])

    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            label={t('TAG_LABLE')}
        />
    );
}