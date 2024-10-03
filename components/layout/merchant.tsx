'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl";
export function MerchantSelection() {
    const t = useTranslations()
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder={t('TAG_SELECT_MERCHANT')} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t('TAG_SELECT_MERCHANT')}</SelectLabel>
                    <SelectItem value="Merchant A">Merchant A(Accountant)</SelectItem>
                    <SelectItem value="Merchant B">Merchant B(Financial)</SelectItem>
                    <SelectItem value="Merchant C">Merchant C(Role)</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
