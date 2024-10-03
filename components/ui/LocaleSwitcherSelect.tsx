'use client';

import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { useEffect, useState, useTransition } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/service/locale';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
    label: string;
};

export default function LocaleSwitcherSelect({
    defaultValue,
    items,
    label
}: Props) {
    const t = useTranslations()
    const initialLocale = useLocale();
    const [isPending, startTransition] = useTransition();
    const [selectedLanguage, setSelectedLanguage] = useState('')

    useEffect(() => {
        if (initialLocale == 'en') {
            setSelectedLanguage('ENGLISH')
        } else {
            setSelectedLanguage('中文')
        }
    }, [])

    function onChange(value: string) {
        if (value == 'en') {
            setSelectedLanguage('ENGLISH')
        } else {
            setSelectedLanguage('中文')
        }
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
    }

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className="relative space-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                    <p>{t("TAG_SITE_LANGUAGE")} : {selectedLanguage}</p>

                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        {t("TAG_SELECT_LANGUAGE")}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup >
                    {
                        items.map((item) => (
                            <DropdownMenuItem key={item.value} onClick={() => onChange(item.value)}>
                                {item.label}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}
