'use client';
import { SetStateAction, useState } from "react";
import LanguageDropdown from "./languageDropdown";

export default function LanguageSelection() {
    const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH')

    return (
        <LanguageDropdown selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
    )
}