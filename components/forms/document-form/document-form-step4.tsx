import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DocumentFormValues } from "@/lib/form-schema";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export default function DocumentFormStep4({ form }: { form: UseFormReturn<DocumentFormValues> }) {
    const t = useTranslations()

    return (
        <>
            <div className="pt-[20px]">
                <h1 className="text-2xl font-semibold">{t('TAG_SUMMARY')}</h1>
                <Separator />
                <ScrollArea>
                    <div className="p-[20px]">
                        <div className="flex gap-4 bg-gray-400 px-2 py-2 text-nowrap justify-between">
                            <p className="flex-1">{t('TAG_CLASSIFICATION_CODE')}</p>
                            <p className="flex-1">{t('TAG_DISC_PROD_SERVICE')}</p>
                            <p className="min-w-[100px] ">{t('TAG_QTY')}</p>
                            <p className="flex-1">{t('TAG_UNIT_PRICE')} (RM)</p>
                            <p className="flex-1">{t('TAG_SUBTOTAL')} (RM)</p>
                        </div>
                        <div className="border-b">
                            {
                                form.getValues('items')?.map((Itemfield, ItemIndex) => {
                                    return (
                                        <div key={Itemfield.itemId}>
                                            <div className="flex gap-4 px-2 py-2 text-nowrap items-center justify-between">
                                                <p className="flex-1 ">{Itemfield.classificationCode}</p>
                                                <p className="flex-1 ">{Itemfield.description}</p>
                                                <p className="min-w-[100px] ">{Number(Itemfield.quantity).toFixed(2)}</p>
                                                <p className="flex-1">{Number(Itemfield.itemPrice).toFixed(2)}</p>
                                                <p className="flex-1">{Number(Itemfield.subTotal)?.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
                <div className="p-[20px]">
                    <div className="grid md:grid-cols-5 gap-4 px-2 py-2">
                        <div className="col-span-2"></div>
                        <div className="grid grid-cols-2 gap-4 col-span-3 items-center justify-center">
                            <p>{t('TAG_TOTAL_TAX_AMOUNT')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {Number(form.getValues('totalTaxAmount'))?.toFixed(2)}
                            </div>

                            <p>{t('TAG_TOTAL_NET_AMOUNT')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700  text-right justify-end p-1 pr-5">
                                {Number(form.getValues('totalNetAmount'))?.toFixed(2)}
                            </div>

                            <p>{t('TOTAL_INVOICE_DISCOUNT_VALUE')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {Number(form.getValues('invoiceDiscountValue'))?.toFixed(2)}
                            </div>
                            <p>{t('TAG_INVOICE_DISCOUNT_DESCRIPTION')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {form.getValues('invoiceDiscountDescriotion')}
                            </div>
                            <p>{t('TAG_INVOICE_FEE_CHARGE_VALUE')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {Number(form.getValues('invoiceFeeChargeValue'))?.toFixed(2)}
                            </div>
                            <p>{t('TAG_INVOICE_FEE_CHARGE_DESCRIPTION')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {form.getValues('invoiceFeeChargeDescription')}
                            </div>
                            <p>{t('TAG_TOTAL_EXCLUDING_TAX')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {Number(form.getValues('totalExcludingTax'))?.toFixed(2)}
                            </div>
                            <p>{t('TAG_TOTAL_INCLUDING_TAX')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {Number(form.getValues('totalIncludingTax'))?.toFixed(2)}
                            </div>
                            <p>{t('TAG_TOTAL_ROUNDING_AMOUNT')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {Number(form.getValues('totalRoundingAmount'))?.toFixed(2)}
                            </div>
                            <p>{t('TAG_TOTAL_PAYABLE_AMOUNT')}</p>
                            <div className="flex w-full h-full rounded-md bg-gray-300 dark:bg-gray-700 text-right justify-end p-1 pr-5">
                                {Number(form.getValues('totalPayableAmount'))?.toFixed(2)}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-[20px] w-full">
                    <div className="flex flex-col pt-[20px] w-full">
                        <div className="flex flex-col w-full border bg-white dark:bg-gray-900 rounded-md">
                            <Accordion
                                type='single'
                                collapsible
                                defaultValue='item-1'

                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className={cn(
                                        'relative !no-underline px-[10px]',
                                    )}>
                                        <h1 className="text-2xl">
                                            {t('TAG_BASIC_INFORMATION')}
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">
                                                <div className="flex-1 md:grid md:grid-cols-2 w-full gap-4">
                                                    <div className="flex-1 md:gap-8 gap-4 grid grid-cols-2 auto-rows-min">
                                                        <h1 className="text-2xl col-span-2">{t('TAG_INVOICE_INFORMATION')}:</h1>

                                                        <div>{t('TAG_INVOICE_ID')}:</div>
                                                        <div>{form.getValues('invoiceId')}</div>

                                                        <div>{t('TAG_ISSUED_DATE_TIME')}:</div>
                                                        <div>{form.getValues('issuesDateTime')}</div>

                                                        <div>{t('TAG_CURRENCY_CODE')}:</div>
                                                        <div>{form.getValues('currencyCode')}</div>

                                                        <div>{t('TAG_INVOICE_TYPE')}:</div>
                                                        <div>{form.getValues('invoiceType')}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                    <div className="flex flex-col pt-[20px] w-full">
                        <div className="flex flex-col w-full border bg-white dark:bg-gray-900 rounded-md">
                            <Accordion
                                type='single'
                                collapsible
                                defaultValue='item-1'
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className={cn(
                                        'relative !no-underline px-[10px]',
                                    )}>
                                        <h1 className="text-2xl">
                                            {t('TAG_SUPPLIER_INFORMATION')}
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="flex-1 gap-4 md:grid md:grid-cols-2 w-full">
                                                        <div className="flex-1 md:gap-8 gap-4 grid grid-cols-2 w-full gap-4 auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_PARTY_INFORMATION')}:</h1>
                                                            <div>{t("TAG_INDUSTRY_CLASSIFICATION_CODE")}:</div>
                                                            <div>{form.getValues('supplierIndustryClassCode')}</div>

                                                            <div>{t('TAG_REGISTRATION_NAME')}:</div>
                                                            <div>{form.getValues('supplierIndustryName')}</div>

                                                            <div>{t('TAG_TAX_IDENTIFICATION_NUMBER')} (TIN):</div>
                                                            <div>{form.getValues('supplierTaxIndentificationNumber')}</div>

                                                            <div>{t("TAG_BUSINESS_REGISTRATION_NUMBER")}:</div>
                                                            <div>{form.getValues('supplierBusinessRegNumber')}</div>

                                                            <div>{t("TAG_SST_REGISTRATION_NUMBER")}:</div>
                                                            <div>{form.getValues('sstRegNumber')}</div>

                                                            <div>{t("TAG_TOURISM_TAX_REGISTRATION_NUMBER")}:</div>
                                                            <div>{form.getValues('tourismTaxRegistrationNum')}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-4 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <div className="md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_ADDRESS')}:</h1>
                                                            <div>{t('TAG_ADDRESS')}:</div>
                                                            <div>{form.getValues('supplierLine')}</div>

                                                            <div>{t('TAG_ZIPCODE')}:</div>
                                                            <div>{form.getValues('supplierZipCode')}</div>

                                                            <div>{t('TAG_TOWN_CITY')}:</div>
                                                            <div>{form.getValues('supplierCity')}</div>

                                                            <div>{t('TAG_STATE')}:</div>
                                                            <div>{form.getValues('supplierState')}</div>

                                                            <div>{t('TAG_COUNTRY')}:</div>
                                                            <div>{form.getValues('supplierCountry')}</div>
                                                        </div>

                                                        <div className="md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min max-[600px]:pt-[20px]">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_CONTACT')}:</h1>
                                                            <div>{t('TAG_CONTACT_NO')}:</div>
                                                            <div>{form.getValues('supplierContact')}</div>

                                                            <div>{t('TAG_EMAIL')}:</div>
                                                            <div>{form.getValues('supplierEmail')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                    <div className="flex flex-col pt-[20px] w-full">
                        <div className="flex flex-col w-full border bg-white dark:bg-gray-900 rounded-md">
                            <Accordion
                                type='single'
                                collapsible
                                defaultValue='item-1'
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className={cn(
                                        'relative !no-underline px-[10px]',
                                    )}>
                                        <h1 className="text-2xl">
                                            {t('TAG_BUYER_INFORMATION')}
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="flex-1 gap-4 md:grid md:grid-cols-2 w-full">
                                                        <div className="flex-1 md:gap-8 gap-4 grid grid-cols-2 w-full gap-4 auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_PARTY_INFORMATION')}:</h1>

                                                            <div>{t('TAG_REGISTRATION_NAME')}:</div>
                                                            <div>{form.getValues('buyerRegisterName')}</div>

                                                            <div>{t('TAG_SST_REGISTRATION_NUMBER')}:</div>
                                                            <div>{form.getValues('buyerSSTRegisterNumber')}</div>

                                                            <div>{t('TAG_IDENTIFICATION_TYPE')}:</div>
                                                            <div>{form.getValues('buyerIdType')} - {form.getValues('buyerRegistration_Identification_PassportNumber')}</div>

                                                            <div>{t('TAG_TAX_IDENTIFICATION_NUMBER')}:</div>
                                                            <div>{form.getValues('buyerTaxIdentificationNumber')}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="md:pt-[20px] ">
                                                    <div className="flex-1 gap-4 md:grid md:grid-cols-2 w-full pt-[20px] max-[600px]:space-y-5">
                                                        <div className="md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_ADDRESS')}:</h1>
                                                            <div>{t('TAG_ADDRESS')}:</div>
                                                            <div>{form.getValues('buyerLine')}</div>

                                                            <div>{t('TAG_ZIPCODE')}:</div>
                                                            <div>{form.getValues('buyerZipCode')}</div>

                                                            <div>{t('TAG_TOWN_CITY')}:</div>
                                                            <div>{form.getValues('buyerCity')}</div>

                                                            <div>{t('TAG_STATE')}:</div>
                                                            <div>{form.getValues('buyerState')}</div>

                                                            <div>{t('TAG_COUNTRY')}:</div>
                                                            <div>{form.getValues('buyerCountry')}</div>
                                                        </div>

                                                        <div className="md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_CONTACT')}:</h1>
                                                            <div>{t('TAG_CONTACT_NO')}:</div>
                                                            <div>{form.getValues('buyerContact')}</div>

                                                            <div>{t('TAG_EMAIL')}:</div>
                                                            <div>{form.getValues('buyerEmail')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                    <div className="flex flex-col pt-[20px] w-full">
                        <div className="flex flex-col w-full border bg-white dark:bg-gray-900 rounded-md">
                            <Accordion
                                type='single'
                                collapsible
                                defaultValue='item-1'
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className={cn(
                                        'relative !no-underline px-[10px]',
                                    )}>
                                        <h1 className="text-2xl">
                                            {t('TAG_DELIVERY_INFORMATION')}
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">

                                                <div className="flex-1 gap-4 md:grid md:grid-cols-2 w-full">
                                                    <div className="md:gap-8 gap-4 grid grid-cols-2 auto-rows-min ">
                                                        <h1 className="text-2xl col-span-2">{t('TAG_PARTY_INFORMATION')}:</h1>

                                                        <div>{t('TAG_REGISTRATION_NAME')}:</div>
                                                        <div>{form.getValues('deliveryName')}</div>

                                                        <div>{t('TAG_IDENTIFICATION_ID')}:</div>
                                                        <div>{form.getValues('deliveryIdType')} - {form.getValues('deliveryRegistration_Identification_PassportNumber')}</div>

                                                        <div>{t('TAG_SHIPPING_RECIPIENT_TIN')}:</div>
                                                        <div>{form.getValues('deliveryShippingRecipientTin')}</div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-4 md:grid md:grid-cols-2 w-full pt-[20px] max-[600px]:space-y-5">
                                                        <div className="flex-1 md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_ADDRESS')}:</h1>

                                                            <div>{t('TAG_ADDRESS')}:</div>
                                                            <div>{form.getValues('deliveryLine')}</div>

                                                            <div>{t('TAG_ZIPCODE')}:</div>
                                                            <div>{form.getValues('deliveryZipCode')}</div>

                                                            <div>{t('TAG_TOWN_CITY')}:</div>
                                                            <div>{form.getValues('deliveryCity')}</div>

                                                            <div>{t('TAG_STATE')}:</div>
                                                            <div>{form.getValues('deliveryState')}</div>

                                                            <div>{t('TAG_COUNTRY')}:</div>
                                                            <div>{form.getValues('deliveryCountry')}</div>
                                                        </div>

                                                        <div className="flex-1 md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_SHIPMENT')}:</h1>

                                                            <div>{t('TAG_DELIVERY_REFERENCE_NUMBER')}:</div>
                                                            <div>{form.getValues('deliveryReferenceNumber')}</div>

                                                            <div>{t('TAG_INCOMTERMS')}:</div>
                                                            <div>{form.getValues('deliveryRefNumIncoterm')}</div>

                                                            <div>{t('TAG_DELIVERY_FREE_TRADE_AGREEMENT')}:</div>
                                                            <div>{form.getValues('deliveryFreeTradeAgreement')}</div>

                                                            <div>{t('TAG_DELIVERY_AUTH_NO_FOR_CERT_EXPORT')}:</div>
                                                            <div>{form.getValues('deliveryAuth_No_for_Cert_Export')}</div>

                                                            <div>{t('TAG_INCOMTERMS')}:</div>
                                                            <div>{form.getValues('deliveryAuth_No_Incoterm')}</div>

                                                            <div>{t('TAG_DETAIL_OF_OTHER_CHARGE')}:</div>
                                                            <div>{form.getValues('deliveryDetailofOtherCharges')}</div>

                                                            <div>{t('TAG_DETAILS_OF_OTHER_CHARGES_DESCRIPTION')}:</div>
                                                            <div>{form.getValues('deliveryDetailofOtherChargesDescirption')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>


                    <div className="flex flex-col pt-[20px] w-full">
                        <div className="flex flex-col w-full border bg-white dark:bg-gray-900 rounded-md">
                            <Accordion
                                type='single'
                                collapsible
                                defaultValue='item-1'
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className={cn(
                                        'relative !no-underline px-[10px]',
                                    )}>
                                        <h1 className="text-2xl">
                                            {t('TAG_ADDITIONAL_INFORMATION')}
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[20px]">
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="flex-1 gap-4 md:grid md:grid-cols-2 w-full">
                                                        <h1 className="text-2xl col-span-2">{t('TAG_PAYMENT_INFORMATION')}:</h1>
                                                    </div >
                                                </div>

                                                <div className="">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px] max-[600px]:space-y-5">
                                                        <div className="flex-1 md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_INVOICE_PERIOD')}:</h1>

                                                            <div>{t('TAG_START_DATE')}:</div>
                                                            <div>{form.getValues('invoicePeriodStartDate')}</div>

                                                            <div>{t('TAG_END_DATE')}:</div>
                                                            <div>{form.getValues('invoicePeriodEndDate')}</div>

                                                            <div>{t('TAG_DESCRIPTION')}:</div>
                                                            <div>{form.getValues('invoicePeriodFrequencyofBilling')}</div>
                                                        </div>

                                                        <div className="flex-1 md:gap-8 gap-4 grid grid-cols-2 w-full auto-rows-min">
                                                            <h1 className="text-2xl col-span-2">{t('TAG_PAYMENT_PREPAID_PAYMENT_INFORMATION')}:</h1>

                                                            <div>{t('TAG_PAYMENT_TYPE')}:</div>
                                                            <div>{form.getValues('paymentType')}</div>

                                                            <div>{t('TAG_SUPPLIER_BANK_ACCOUNT_NUMBER')}:</div>
                                                            <div>{form.getValues('supplierbankAccountNumber')}</div>

                                                            <div>{t('TAG_PAYMENT_TERMS')}:</div>
                                                            <div>{form.getValues('paymentTerm')}</div>

                                                            <div>{t('TAG_PREPAID_AMOUNT')}:</div>
                                                            <div>{form.getValues('prepaidAmount')}</div>

                                                            <div>{t('TAG_ISSUED_DATE')}:</div>
                                                            <div>{form.getValues('issuedDate')}</div>

                                                            <div>{t('TAG_PREPAYMENT_REFERENCE_NUMBER')}:</div>
                                                            <div>{form.getValues('prepaymentReferenceNumber')}</div>

                                                            <div>{t('TAG_BILL_REFERENCE_NUMBER')}:</div>
                                                            <div>{form.getValues('billreferenceNumber')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}