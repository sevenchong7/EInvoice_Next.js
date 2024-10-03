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
import { Dispatch, SetStateAction } from 'react';
import { cookies } from 'next/headers';


export default function LanguageDropdown(
    {
        selectedLanguage,
        setSelectedLanguage
    }: {
        selectedLanguage: string,
        setSelectedLanguage: Dispatch<SetStateAction<string>>
    }
) {
    const changeLanguage = (locale: string) => {
        // Save the locale in localStorage or cookies
        // localStorage.setItem('locale', locale);
        // Update the URL with the new locale
        // router.push(router.pathname, router.asPath, { locale });
        setSelectedLanguage(locale === 'en' ? 'ENGLISH' : '中文');

    };

    return (
        // <LocaleSwitcher />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className="relative space-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                    <p>Site Language : {selectedLanguage}</p>

                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        Select Your Language
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => changeLanguage('en')}>
                        English
                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('zh')}>
                        中文
                        {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
