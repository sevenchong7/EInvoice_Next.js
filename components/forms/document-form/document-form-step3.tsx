import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DocumentFormValues } from "@/lib/form-schema";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function DocumentFormStep3({ form }: { form: UseFormReturn<DocumentFormValues> }) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations()

    const {
        control,
        formState: { errors }
    } = form;

    return (
        <div className="p-1">
            <div className="pt-[20px] space-y-3">
                <div>
                    <h1 className="text-2xl font-semibold">{t('TAG_INVOICE_PERIOD')}</h1>
                    <Separator />
                </div>
                <div className="grid md:grid-cols-3 gap-8 pl-[20px]">
                    <FormField
                        control={form.control}
                        name="invoicePeriodStartDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_START_DATE')}</FormLabel>
                                <FormControl>
                                    <Input
                                        type='date'
                                        disabled={loading}
                                        placeholder="Pick a date"
                                        {...field}
                                    />
                                    {/* <DateTimePicker value={field.value} onChange={field.onChange} /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="invoicePeriodEndDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_END_DATE')}</FormLabel>
                                <FormControl>
                                    {/* <DateTimePicker value={field.value} onChange={field.onChange} /> */}
                                    <Input
                                        type='date'
                                        disabled={loading}
                                        placeholder="Pick a date"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"invoicePeriodFrequencyofBilling"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_PAYMENT_INVOICE_ID')}</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="pt-[20px] space-y-3">
                <div>
                    <h1 className="text-2xl font-semibold">{t('TAG_PAYMENT_PREPAID_PAYMENT_INFORMATION')}</h1>
                    <Separator />
                </div>
                <div className=" gap-8 md:grid md:grid-cols-3 pl-[20px]">

                    <FormField
                        control={form.control}
                        name={"paymentType"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_PAYMENT_TYPE')}</FormLabel>
                                <FormControl>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        // defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <SelectTrigger >
                                            <SelectValue placeholder="Payment Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="bankTransfer">{t('TAG_BANK_TRANSFER')}</SelectItem>
                                                <SelectItem value="cash">{t('TAG_CASH')}</SelectItem>
                                                <SelectItem value="cheque">{t('TAG_CHEQUE')}</SelectItem>
                                                <SelectItem value="credit">{t('TAG_CREDIT')}</SelectItem>
                                                <SelectItem value="debit">{t('TAG_DEBIT')}</SelectItem>
                                                <SelectItem value="digitalBank">{t('TAG_DIGITAL_BANK')}</SelectItem>
                                                <SelectItem value="e-wallet_digitalWallet">{t('TAG_E_WALLET_DIGITAL_WALLET')}</SelectItem>
                                                <SelectItem value="Others">{t('TAG_OTHER')}</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"supplierbankAccountNumber"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_SUPPLIER_BANK_ACCOUNT_NUMBER')}</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"paymentTerm"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("TAG_PAYMENT_TERMS")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className=" gap-8 md:grid md:grid-cols-3 pl-[20px]">
                    <FormField
                        control={form.control}
                        name={"prepaidAmount"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("TAG_PREPAID_AMOUNT")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="issuedDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_ISSUED_DATE')}</FormLabel>
                                <FormControl>
                                    {/* <DateTimePicker value={field.value} onChange={field.onChange} /> */}
                                    <Input
                                        type='date'
                                        disabled={loading}
                                        placeholder="Pick a date"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"prepaymentReferenceNumber"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_PREPAYMENT_REFERENCE_NUMBER')}</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div >
                <div className=" gap-8 md:grid md:grid-cols-3 pl-[20px]">
                    <FormField
                        control={form.control}
                        name={"billreferenceNumber"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_BILL_REFERENCE_NUMBER')}</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div >
            </div >
        </div>
    )
}