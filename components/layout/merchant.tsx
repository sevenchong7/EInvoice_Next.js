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
import { useState } from 'react';
export function MerchantSelection() {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select a Merchant" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select a Merchant</SelectLabel>
                    <SelectItem value="Merchant A">Merchant A(Accountant)</SelectItem>
                    <SelectItem value="Merchant B">Merchant B(Financial)</SelectItem>
                    <SelectItem value="Merchant C">Merchant C(Role)</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
