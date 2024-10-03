import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { FieldArrayWithId, useFieldArray, UseFieldArrayInsert, UseFieldArrayRemove, UseFormReturn, useWatch } from "react-hook-form";
import { DocumentFormValues } from "@/lib/form-schema"
import { DateTimePicker } from "@/components/ui/datetime";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Required from "@/components/ui/required";
import LineItem from "./lineItem/lineItem";
import { useTranslations } from "next-intl";
import React from "react";

export default function DocumentFormStep1({ form }: { form: UseFormReturn<DocumentFormValues> }) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations()
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState<number>();
    const [edit, setEdit] = useState(false);
    const [discount, setDiscount] = useState<number>(0);
    const [charge, setCharge] = useState<number>(0);
    const [rouding, setRounding] = useState<number>(0);
    const [invoiceType, setInvoiceType] = useState('')
    const [datetime, setDatetime] = useState()

    const {
        control,
        watch,
        formState: { errors }
    } = form;

    const {
        insert: insertItems,
        append: appendItems,
        remove: removeItems,
        update: updateItems,
        fields: fieldsItems,
    } = useFieldArray({
        control,
        name: 'items',
    });

    const HandleAddItems = () => {
        setOpen(!open)
        appendItems({
            itemId: '',
            classificationCode: '',
            description: '',

            itemPrice: 0,
            quantity: 0,

            discountRate: 0,
            discountAmount: 0,
            discountDescription: '',

            chargeRate: 0,
            chargeAmount: 0,
            chargeDescription: '',

            taxableAmount: 0,
            netTaxableAmount: 0,

            rateType: '',

            taxTypeExempted: '',
            amountExempted: 0,
            amountOfTaxExempted: 0,
            detailOfTaxExemption: '',

            subTotal: 0,
            totalDiscount: 0,
            totalCharge: 0,
            totalTaxAmount: 0,
        })
    }

    const HandleCancle = (ItemIndex: number) => {
        setOpen(false);
        removeItems(ItemIndex);
    }

    const handleItemUpdate = (index: number, updatedItem: DocumentFormValues['items'][number]) => {
        updateItems(index, updatedItem);
        calculateTotals();
    };

    const handelEdit = (index: number) => {
        setOpenIndex(index)
        // setEdit(true)
    }

    const handleClose = () => {
        setOpenIndex(-1); // Close the sheet
    };


    const calculateTotals = () => {
        const items = form.getValues('items');
        let totalTaxAmount = 0;
        let totalNetAmount = 0;

        items?.forEach((item) => {
            const taxAmount = Number(item.totalTaxAmount) || 0;
            const taxableAmount = Number(item.taxableAmount) || 0;

            totalTaxAmount += taxAmount;
            totalNetAmount += taxableAmount;
        });

        form.setValue('totalTaxAmount', totalTaxAmount, { shouldDirty: true });
        form.setValue('totalNetAmount', totalNetAmount, { shouldDirty: true });
    };

    useEffect(() => {
        const dis = discount;
        const char = charge;
        Number(form.setValue('invoiceDiscountValue', dis))
        Number(form.setValue('invoiceFeeChargeValue', char))
        const totalNetAmount = Number(form.getValues('totalNetAmount')) ?? 0;

        const exclude = totalNetAmount - dis + char;

        form.setValue('totalExcludingTax', exclude);


    }, [discount, charge, form.getFieldState('totalNetAmount')])

    useEffect(() => {
        const exclude = Number(form.getValues('totalExcludingTax')) ?? 0
        const totalTaxAmount = Number(form.getValues('totalTaxAmount')) ?? 0
        const include = exclude + totalTaxAmount;

        form.setValue('totalIncludingTax', include);

    }, [form.getFieldState('totalExcludingTax'), form.getFieldState('totalTaxAmount')])

    useEffect(() => {

        const include = Number(form.getValues('totalIncludingTax')) ?? 0
        const round = rouding
        Number(form.setValue('totalRoundingAmount', rouding))
        const totalPayableAmount = include + round;

        form.setValue('totalPayableAmount', totalPayableAmount)


    }, [form.getFieldState('totalIncludingTax'), rouding])

    useEffect(() => {
        setInvoiceType(form.getValues('invoiceType'))
    }, [])

    return (
        <>
            <div className="pt-[20px]">
                <h1 className="text-3xl font-semibold">{t('TAG_INVOICE_INFORMATION')}</h1>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="gap-8 md:grid md:grid-cols-3 p-[10px]">
                    <FormField
                        control={form.control}
                        name="invoiceId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_INVOICE_ID')} <Required /></FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        placeholder="INV5740523579847624739"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="issuesDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="issuesDateTime" >{t('TAG_ISSUED_DATE_TIME')} <Required /></FormLabel>
                                <FormControl>
                                    <DateTimePicker
                                        value={field.value ? new Date(field.value) : undefined}
                                        onChange={(date) => field.onChange(date?.toISOString() || undefined)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="invoiceType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_INVOICE_TYPE')} <Required /></FormLabel>
                                <FormControl>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        // defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <SelectTrigger >
                                            <SelectValue placeholder="Invoice Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="invoice">{t('TAG_INVOICE')}</SelectItem>
                                                <SelectItem value="creditNote">{t('TAG_CREDIT_NOTE')}</SelectItem>
                                                <SelectItem value="debitNote">{t('TAG_DEBIT_NOTE')}</SelectItem>
                                                <SelectItem value="refundNote">{t('TAG_REFUND_NOTE')}</SelectItem>
                                                <SelectItem value="selfBilledInvoice">{t('TAG_SELF_BILLED_INVOICE')}</SelectItem>
                                                <SelectItem value="selfBilledCreditNote">{t('TAG_SELF_BILLED_CREDIT_NOTE')}</SelectItem>
                                                <SelectItem value="selfBilledDebitNote">{t('TAG_SELF_BILLED_DEBIT_NOTE')}</SelectItem>
                                                <SelectItem value="selfBilledRefundNote">{t('TAG_SELF_BILLED_REFUND_NOTE')}</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
            </div>

            {
                invoiceType != 'invoice' && invoiceType != 'selfBilledInvoice' &&
                <div className="pt-[50px]">
                    <h1 className="text-3xl font-semibold">{t('TAG_BILLING_REFERENCE')}</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[10px]">
                        <FormField
                            control={form.control}
                            name="invoiceDocRef"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_INVOICE_DOC_REFERENCE')} <Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={loading}
                                            {...field}
                                            value={field.value ?? ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="additionalInvoiceDocRef"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('TAG_ADDITIONAL_INVOICE_DOC_REFERENCES')} <Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={loading}
                                            {...field}
                                            value={field.value ?? ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            }

            <div className="pt-[50px]">
                <div className="flex justify-between py-2">
                    <h1 className="text-3xl font-semibold">{t('TAG_LINE_ITEM')}</h1>
                    <div className="flex flex-col justify-end items-end">
                        <Sheet >
                            <SheetTrigger asChild>
                                <Button onClick={() => { HandleAddItems() }}>+ {t('TAG_ADD_LINE')}</Button>
                            </SheetTrigger>
                            {
                                fieldsItems?.map((Itemfield, ItemIndex) => {
                                    return (
                                        <div key={Itemfield.id} >
                                            {
                                                ItemIndex == fieldsItems.length - 1 &&
                                                <LineItem isOpen={open} onOpenChange={() => HandleCancle(ItemIndex)} form={form} Itemindex={ItemIndex} setOpen={setOpen} onItemUpdate={handleItemUpdate} />
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Sheet>
                        <FormField
                            control={form.control}
                            name="items"

                            render={({ field }) => (
                                <FormItem>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="gap-8 md:grid md:grid-cols-3 p-[10px]">

                    <FormField
                        control={form.control}
                        name="currencyCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_CURRENCY')}</FormLabel>
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
                        name="exchangeRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('TAG_EXCHANGE_RATE')}</FormLabel>
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

            <ScrollArea>
                <div className="pt-[50px]">
                    <div className="flex  gap-4 bg-gray-400 px-2 py-2 lg:text-nowrap justify-between">
                        <p className="flex-1 hidden lg:block">{t('TAG_CLASSIFICATION_CODE')}</p>
                        <p className="flex-1 lg:hidden md:block">{t('TAG_CLASS_CODE')}</p>
                        <p className="flex-1">{t('TAG_DISC_PROD_SERVICE')}</p>
                        <p className="md:min-w-[100px]">{t('TAG_QTY')}</p>
                        <p className="flex-1">{t('TAG_UNIT_PRICE')} (RM)</p>
                        <p className="flex-1">{t('TAG_SUBTOTAL')} (RM)</p>
                        <p className="min-w-[70px]"></p>
                    </div>
                    <div className="border-b">
                        {
                            fieldsItems.map((Itemfield, ItemIndex) => {
                                return (
                                    <div key={Itemfield.id}>
                                        <div className="flex  gap-4 px-2 py-2 md:text-nowrap items-center justify-between">
                                            <p className="flex-1 ">{Itemfield.classificationCode}</p>
                                            <p className="flex-1 ">{Itemfield.description}</p>
                                            <p className="md:min-w-[100px]">{Number(Itemfield.quantity)}</p>
                                            <p className="flex-1">{Number(Itemfield.itemPrice).toFixed(2)}</p>
                                            <p className="flex-1">{Number(Itemfield.subTotal)?.toFixed(2)}</p>
                                            <div className="min-w-[70px]">
                                                <div className="flex justify-between">
                                                    <Sheet>
                                                        <SheetTrigger asChild>
                                                            <button onClick={() => handelEdit(ItemIndex)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                                                            </button>
                                                        </SheetTrigger>
                                                        <LineItem
                                                            isOpen={openIndex === ItemIndex} // Check if the current item is open
                                                            onOpenChange={() => handleClose()}
                                                            form={form}
                                                            Itemindex={ItemIndex}
                                                            setOpen={handleClose}
                                                            onItemUpdate={handleItemUpdate}
                                                        />
                                                        {/* <LineItem isOpen={edit} onOpenChange={handleClose} form={form} Itemindex={ItemIndex} removeItems={() => removeItems} insertItems={() => insertItems} setOpen={setEdit} onItemUpdate={handleItemUpdate} /> */}
                                                    </Sheet>

                                                    <button onClick={() => removeItems(ItemIndex)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <div className="pt-[20px]">
                <div className="grid md:grid-cols-5 gap-4  px-2 py-2">
                    <div className="md:col-span-2"></div>
                    <div className="grid grid-cols-2 gap-4 col-span-3 items-center">
                        <p>{t('TAG_TOTAL_TAX_AMOUNT')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="totalTaxAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={true}
                                                {...field}
                                                value={form.getValues('totalTaxAmount')?.toFixed(2) ?? 0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_TOTAL_NET_AMOUNT')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="totalNetAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={true}
                                                {...field}
                                                value={form.getValues('totalNetAmount')?.toFixed(2) ?? 0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TOTAL_INVOICE_DISCOUNT_VALUE')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="invoiceDiscountValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={loading}
                                                {...field}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);

                                                    // Call React Hook Form's onChange handler
                                                    field.onChange(value);

                                                    // Update the local state
                                                    setDiscount(value);
                                                }}
                                                value={discount}
                                                min={0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_INVOICE_DISCOUNT_DESCRIPTION')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="invoiceDiscountDescriotion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                {...field}
                                                className="text-right pr-7"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_INVOICE_FEE_CHARGE_VALUE')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="invoiceFeeChargeValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={loading}
                                                {...field}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);

                                                    // Call React Hook Form's onChange handler
                                                    field.onChange(value);

                                                    // Update the local state
                                                    setCharge(value);
                                                }}
                                                value={charge}
                                                min={0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_INVOICE_FEE_CHARGE_DESCRIPTION')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="invoiceFeeChargeDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                {...field}
                                                className="text-right pr-7"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_TOTAL_EXCLUDING_TAX')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="totalExcludingTax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={true}
                                                {...field}
                                                value={Number(form.getValues('totalExcludingTax'))?.toFixed(2) ?? 0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_TOTAL_INCLUDING_TAX')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="totalIncludingTax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={true}
                                                {...field}
                                                value={Number(form.getValues('totalIncludingTax'))?.toFixed(2) ?? 0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_TOTAL_ROUNDING_AMOUNT')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="totalRoundingAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={loading}
                                                {...field}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);

                                                    // Call React Hook Form's onChange handler
                                                    field.onChange(value);

                                                    // Update the local state
                                                    setRounding(value);
                                                }}
                                                value={rouding}
                                                min={0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p>{t('TAG_TOTAL_PAYABLE_AMOUNT')}</p>
                        <div>
                            <FormField
                                control={form.control}
                                name="totalPayableAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                disabled={true}
                                                {...field}
                                                value={form.getValues('totalPayableAmount')?.toFixed(2) ?? 0}
                                                className="text-right"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}