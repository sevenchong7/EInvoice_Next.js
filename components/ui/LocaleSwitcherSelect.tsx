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
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserTaskStore } from '@/lib/store/userStore';
import { useDataTaskStore } from '@/lib/store/dataStore';

type Props = {
    defaultValue: string;
    label: string;
};

export default function LocaleSwitcherSelect({
    defaultValue,
    label,

}: Props) {
    const t = useTranslations()
    const router = useRouter();
    const initialLocale = useLocale();
    const [isPending, startTransition] = useTransition();
    const [localeData, setLoacalData] = useState('en')
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const { data: session, update } = useSession();
    const loaclLanguage = useDataTaskStore((state) => state.language)// Redux value
    const languageData = useUserTaskStore((state) => state.getLanguageList) //Redux value 
    const setLocal = useDataTaskStore((state) => state.setLocal)//Redux setValue

    useEffect(() => {
        if (initialLocale == 'en') {
            setSelectedLanguage('ENGLISH')
        } else if (initialLocale == 'bm') {
            setSelectedLanguage('Melayu')
        } else {
            setSelectedLanguage('中文')
        }
    }, [])

    async function onChange(value: string) {
        if (value == 'English') {
            setSelectedLanguage('English')
            setLocal('en')
            setLoacalData('en')
            await update({ xAcceptLanguage: "en" })
        } else if (value == 'Melayu') {
            setSelectedLanguage('Melayu')
            setLoacalData('bm')
            setLocal('bm')
            await update({ xAcceptLanguage: "bm" })
        } else {
            setSelectedLanguage('中文')
            setLoacalData('zh')
            setLocal('zh')
            await update({ xAcceptLanguage: "zh" })
        }
        // const locale = value as Locale;


        // if (session)
        //     window.location.reload() //reload the page to call api again to change the data language
    }

    useEffect(() => {
        startTransition(() => {
            setUserLocale(loaclLanguage as Locale); // set the local 
        });
        // router.refresh()
    }, [localeData, loaclLanguage])

    return (

        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className="relative space-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                    <p className='lg:block hidden'>{t("TAG_SITE_LANGUAGE")} : {selectedLanguage}</p>
                    <p className='lg:hidden md:hidden sm:block'>{selectedLanguage}</p>
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
                        // !languageData ?
                        <div>
                            <DropdownMenuItem key={'English'} onClick={() => onChange('English')}>
                                <div className='flex  items-center gap-4'>
                                    English
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem key={'Melayu'} onClick={() => onChange('Melayu')}>
                                <div className='flex  items-center gap-4'>
                                    Melayu
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem key={'中文'} onClick={() => onChange('中文')}>
                                <div className='flex  items-center gap-4'>
                                    中文
                                </div>
                            </DropdownMenuItem>
                        </div>
                        // :languageData?.map((item) => (
                        //     <DropdownMenuItem key={item.languageName} onClick={() => onChange(item.languageName)}>
                        //         <div className='flex  items-center gap-4'>
                        //             <Image src={item.languageFlag} alt={item.languageName} height={24} width={24} />
                        //             {item.languageName}
                        //         </div>
                        //     </DropdownMenuItem>
                        // ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}
