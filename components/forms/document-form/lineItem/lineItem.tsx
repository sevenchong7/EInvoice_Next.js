import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { FieldArrayWithId, useFieldArray, UseFieldArrayInsert, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
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
import { useTranslations } from "next-intl";

export default function LineItem(
    {
        form,
        Itemindex,
        isOpen,
        onOpenChange,
        setOpen,
        onItemUpdate

    }: {
        isOpen: boolean,
        onOpenChange?: any,
        form: UseFormReturn<DocumentFormValues>,
        Itemindex: number,
        setOpen: any,
        onItemUpdate: (index: number, updatedItem: DocumentFormValues['items'][number]) => void;

    }) {
    const t = useTranslations()
    const [loading, setLoading] = useState(false);
    const [rateType, setRateType] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [taxableAmount, setTaxableAmount] = useState(0);
    const [netTaxableAmount, setNetTaxableAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalCharge, setTotalCharge] = useState(0);

    useEffect(() => {
        const subTotal = (form.getValues(`items.${Itemindex}.itemPrice`) * form.getValues(`items.${Itemindex}.quantity`))
        form.setValue(`items.${Itemindex}.subTotal`, subTotal);
        setSubTotal(subTotal);

    }, [form.watch(`items.${Itemindex}.itemPrice`), form.watch(`items.${Itemindex}.quantity`)])

    useEffect(() => {
        const discount = (form.getValues(`items.${Itemindex}.discountRate`) * subTotal) / 100;
        form.setValue(`items.${Itemindex}.totalDiscount`, discount);
        setTotalDiscount(discount);

    }, [form.watch(`items.${Itemindex}.discountRate`), subTotal])

    useEffect(() => {
        const charge = (form.getValues(`items.${Itemindex}.chargeRate`) * subTotal) / 100;
        form.setValue(`items.${Itemindex}.totalCharge`, charge);
        setTotalCharge(charge);

    }, [form.watch(`items.${Itemindex}.chargeRate`), subTotal])

    useEffect(() => {
        const taxableAmount = subTotal - totalDiscount + totalCharge;
        form.setValue(`items.${Itemindex}.taxableAmount`, taxableAmount)
        setTaxableAmount(taxableAmount);
    }, [subTotal, totalDiscount, totalCharge])

    useEffect(() => {
        const netTaxableAmount = taxableAmount - form.getValues(`items.${Itemindex}.amountExempted`);
        form.setValue(`items.${Itemindex}.netTaxableAmount`, netTaxableAmount);
        setNetTaxableAmount(netTaxableAmount);

    }, [taxableAmount, form.watch(`items.${Itemindex}.amountExempted`)])

    useEffect(() => {
        let sum = 0;
        const totalTaxperType = form.getValues(`items.${Itemindex}.rate`);
        totalTaxperType?.forEach((value, index) => {
            if (form.getValues(`items.${Itemindex}.rate.${index}.rateType`) == 'tax') {
                const taxperType = netTaxableAmount * form.getValues(`items.${Itemindex}.rate.${index}.taxPercentage`)! / 100
                form.setValue(`items.${Itemindex}.rate.${index}.totalTaxPerType`, taxperType)
                sum += taxperType;
            } else if (form.getValues(`items.${Itemindex}.rate.${index}.rateType`) == 'unit') {
                const taxPercentage = form.getValues(`items.${Itemindex}.rate.${index}.noOfUnit`)! * form.getValues(`items.${Itemindex}.rate.${index}.rateUnit`)! / taxableAmount * 100;
                form.setValue(`items.${Itemindex}.rate.${index}.taxPercentage`, taxPercentage);
                const taxperType = netTaxableAmount * form.getValues(`items.${Itemindex}.rate.${index}.taxPercentage`)! / 100
                form.setValue(`items.${Itemindex}.rate.${index}.totalTaxPerType`, taxperType)
                sum += taxperType;
            }
        })

        setTotalAmount(sum);
        form.setValue(`items.${Itemindex}.totalTaxAmount`, sum);

    }, [form.getFieldState(`items.${Itemindex}.rate`)])

    useEffect(() => {
        const totalTaxperType = form.getValues(`items.${Itemindex}.rate`);
        if (totalTaxperType?.length === 0) {
            const amountOfTaxExempted = 0 * form.getValues(`items.${Itemindex}.amountExempted`);
            form.setValue(`items.${Itemindex}.amountOfTaxExempted`, amountOfTaxExempted);
        } else {
            let sumTax = 0;
            totalTaxperType?.forEach((value, index) => {
                const taxperType = Number(value.taxPercentage);
                sumTax += taxperType!;
            });

            const amountOfTaxExempted = form.getValues(`items.${Itemindex}.amountExempted`) * sumTax / 100;
            form.setValue(`items.${Itemindex}.amountOfTaxExempted`, parseFloat(amountOfTaxExempted.toFixed(2)));
        }
    }, [form.watch(`items.${Itemindex}.amountExempted`), form.getFieldState(`items.${Itemindex}.rate`)]);


    const {
        control,
        trigger,
        formState: { errors }
    } = form;

    const {
        append: appendRate,
        remove: removeRate,
        fields: fieldsRate,
    } = useFieldArray({
        control,
        name: `items.${Itemindex}.rate`,
    });

    const HandleAddTaxSubtotal = () => {

        if (rateType != '') {
            form.setValue(`items.${Itemindex}.rateType`, rateType)
        }

        const currentRateType = form.getValues(`items.${Itemindex}.rateType`);

        if (currentRateType != '') {
            setRateType('');

            if (currentRateType === 'tax') {
                appendRate({
                    rateType: form.getValues(`items.${Itemindex}.rateType`),
                    taxPercentage: 0,
                    taxType: '',

                });
            } else if (currentRateType === 'unit') {
                appendRate({
                    rateType: form.getValues(`items.${Itemindex}.rateType`),
                    taxPercentage: 0,
                    taxType: '',
                    noOfUnit: 0,
                    rateUnit: 0,
                });
            }
        }
        else {
            form.setError(`items.${Itemindex}.rateType`, { message: 'Please select a rate type!' })
        }
    }

    const HandleSubmitLineItem = async () => {
        const itemData: DocumentFormValues['items'][number] = {
            itemId: form.getValues(`items.${Itemindex}.itemId`),
            classificationCode: form.getValues(`items.${Itemindex}.itemId`),
            description: form.getValues(`items.${Itemindex}.description`),

            itemPrice: form.getValues(`items.${Itemindex}.itemPrice`),
            quantity: form.getValues(`items.${Itemindex}.quantity`),

            discountRate: form.getValues(`items.${Itemindex}.discountRate`),
            discountAmount: form.getValues(`items.${Itemindex}.discountAmount`),
            discountDescription: form.getValues(`items.${Itemindex}.discountDescription`),

            chargeRate: form.getValues(`items.${Itemindex}.chargeRate`),
            chargeAmount: form.getValues(`items.${Itemindex}.chargeAmount`),
            chargeDescription: form.getValues(`items.${Itemindex}.chargeDescription`),

            taxableAmount: form.getValues(`items.${Itemindex}.taxableAmount`),
            netTaxableAmount: form.getValues(`items.${Itemindex}.netTaxableAmount`),

            rate: [
                ...fieldsRate.map((_, rateIndex) => {
                    return {
                        rateType: form.getValues(`items.${Itemindex}.rate.${rateIndex}.rateType`),
                        taxType: form.getValues(`items.${Itemindex}.rate.${rateIndex}.taxType`),
                        taxPercentage: form.getValues(`items.${Itemindex}.rate.${rateIndex}.taxPercentage`),
                        noOfUnit: form.getValues(`items.${Itemindex}.rate.${rateIndex}.noOfUnit`),
                        rateUnit: form.getValues(`items.${Itemindex}.rate.${rateIndex}.rateUnit`),
                        totalTaxPerType: form.getValues(`items.${Itemindex}.rate.${rateIndex}.totalTaxPerType`),
                    }
                })
            ],

            taxTypeNotApplicable: form.getValues(`items.${Itemindex}.taxTypeNotApplicable`),
            taxNotApplicable: form.getValues(`items.${Itemindex}.taxNotApplicable`),
            totalTaxPerTypeNotApplicable: form.getValues(`items.${Itemindex}.totalTaxPerTypeNotApplicable`),

            taxTypeExempted: form.getValues(`items.${Itemindex}.taxTypeExempted`),
            amountExempted: form.getValues(`items.${Itemindex}.amountExempted`),
            amountOfTaxExempted: form.getValues(`items.${Itemindex}.amountOfTaxExempted`),
            detailOfTaxExemption: form.getValues(`items.${Itemindex}.detailOfTaxExemption`),

            subTotal: form.getValues(`items.${Itemindex}.subTotal`),
            totalDiscount: form.getValues(`items.${Itemindex}.totalDiscount`),
            totalCharge: form.getValues(`items.${Itemindex}.totalCharge`),
            // totalExcludingTaxAmount: form.getValues(`items.${Itemindex}.totalExcludingTaxAmount`),
            // amountExemptedFromTax: form.getValues(`items.${Itemindex}.amountExemptedFromTax`),
            totalTaxAmount: form.getValues(`items.${Itemindex}.totalTaxAmount`),
        }

        // insertItems(Itemindex, itemData);
        if (await trigger(`items.${Itemindex}`)) {
            onItemUpdate(Itemindex, itemData);
            setOpen(false);
        } else {
            // removeItems(Itemindex)
        }
    }

    // const title = initialData != null ? 'Edit Line Itme' : 'Add Line Item';
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="md:min-w-[970px] min-w-full">
                <ScrollArea className="h-full">
                    <div className="p-1 pr-10">
                        <SheetHeader>
                            <SheetTitle>{t('TAG_ADD_LINE_ITEM')}</SheetTitle>
                        </SheetHeader>
                        <div className="pt-[20px]">
                            <h1 className="text-xl font-semibold">{t('TAG_ITEM_INFORMATION')}</h1>
                            <Separator />
                            <div className="grid md:grid-cols-8 gap-4 pt-[10px]">
                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.itemId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_ITEM_ID')} <Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.classificationCode`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_CLASSIFICATION_CODE')} <Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* <div></div> */}

                                <div className="col-span-6">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_DESCRIPTION')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* <div></div> */}

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.itemPrice`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_ITEM_PRICE')} <Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.quantity`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_QUANTITY')} <Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div></div>
                            </div>
                        </div>

                        <div className="pt-[30px]">
                            <h1 className="text-xl font-semibold">{t('TAG_DISCOUNT_CHARGE')}</h1>
                            <Separator />
                            <div className="grid md:grid-cols-7 gap-4 pt-[10px]">
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.discountRate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_DISCOUNT_RATE_AMOUNT')} (%) <Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.discountAmount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_AMOUNT')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={true}
                                                        {...field}
                                                        value={totalDiscount.toFixed(2)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.discountDescription`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_DISCOUNT_DESCRIPTION')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.chargeRate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_FEE_CHARGE_RATE_AMOUNT')} (%) <Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.chargeAmount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_AMOUNT')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={true}
                                                        {...field}
                                                        value={totalCharge.toFixed(2)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.chargeDescription`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_CHARGE_DESCRIPTION')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-[30px]">
                            <h1 className="text-xl font-semibold">{t('TAG_TAXABLE_AMOUNT')}</h1>
                            <Separator />
                            <div className="grid md:grid-cols-8 gap-4 pt-[10px]">
                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.taxableAmount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_TAXABLE_AMOUNT')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={true}
                                                        {...field}
                                                        value={taxableAmount.toFixed(2)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.netTaxableAmount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('TAG_NET_TAXABLE_AMOUNT')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={true}
                                                        {...field}
                                                        value={netTaxableAmount.toFixed(2)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-[30px]">
                            <div className="flex justify-between p-1 items-center">
                                <h1 className="text-xl font-semibold">{t('TAG_TAX_SUBTOTAL')}</h1>
                                <div className="flex space-x-5">
                                    < FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.rateType`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select
                                                        disabled={loading}
                                                        onValueChange={field.onChange}
                                                    // defaultValue={field.value}
                                                    // value={field.value}
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder={t('TAG_RATE_TYPE')} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="tax">{t('TAG_TAX')}</SelectItem>
                                                                <SelectItem value="unit">{t('TAG_UNIT')}</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button onClick={() => { HandleAddTaxSubtotal() }} disabled={fieldsRate.length == 5} className="bg-black text-white dark:bg-white dark:text-black rounded-full w-[35px] h-[35px] hover:bg-gray-700 dark:hover:bg-gray-300">+</Button>
                                </div>

                            </div>
                            <Separator />
                            <div className="pb-[20px]">
                                {fieldsRate.length === 0 ?
                                    <div className="flex gap-4 space-y-2 pt-[10px]">
                                        <p className="pt-2">1.</p>
                                        <div className="grid md:grid-cols-3 gap-4 w-full">
                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.taxTypeNotApplicable`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('TAG_TAX_TYPE')}</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                disabled={true}
                                                                {...field}
                                                                value={t('TAG_NOT_APPLICABLE')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.taxNotApplicable`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('TAG_TAX')} (%)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                disabled={true}
                                                                {...field}
                                                                value={0}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.totalTaxPerTypeNotApplicable`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('TAG_TOTAL_TAX_PER_TYPE')}</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                disabled={true}
                                                                {...field}
                                                                value={0}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="pl-[24px]"></div>
                                    </div>
                                    :
                                    <div>
                                        {
                                            fieldsRate.map((rate, rateIndex) => {
                                                return (
                                                    <div key={rate.id}>
                                                        {
                                                            form.getValues(`items.${Itemindex}.rate.${rateIndex}.rateType`) == 'tax' ?
                                                                <div className="flex gap-4 space-y-2 pt-[10px]">
                                                                    <p className="pt-2">{rateIndex + 1}.</p>
                                                                    <div className="grid md:grid-cols-3 gap-4 w-full">
                                                                        < FormField
                                                                            control={form.control}
                                                                            name={`items.${Itemindex}.rate.${rateIndex}.taxType`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>{t('TAG_TAX_TYPE')}</FormLabel>
                                                                                    <FormControl>
                                                                                        <Select
                                                                                            disabled={loading}
                                                                                            onValueChange={field.onChange}
                                                                                        // defaultValue={field.value}
                                                                                        // value={field.value ?? ''}
                                                                                        >
                                                                                            <SelectTrigger >
                                                                                                <SelectValue placeholder={t('TAG_TAX_TYPE')} />
                                                                                            </SelectTrigger>
                                                                                            <SelectContent>
                                                                                                <SelectGroup>
                                                                                                    <SelectItem value="Sales">{t('TAG_SALE_TAX')}</SelectItem>
                                                                                                    <SelectItem value="Service">{t('TAG_SERVICE_TAX')}</SelectItem>
                                                                                                    <SelectItem value="Tourism">{t('TAG_TOURISM_TAX')}</SelectItem>
                                                                                                    <SelectItem value="High-Value">{t('TAG_HIGH_VALUE_TAX')}</SelectItem>
                                                                                                    <SelectItem value="Low-Value">{t('TAG_LOW_VALUE_TAX')}</SelectItem>
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
                                                                            name={`items.${Itemindex}.rate.${rateIndex}.taxPercentage`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>{t('TAG_TAX')} (%)</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            type="number"
                                                                                            // disabled={true}
                                                                                            {...field}
                                                                                            value={field.value ?? 0}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />

                                                                        <FormField
                                                                            control={form.control}
                                                                            name={`items.${Itemindex}.rate.${rateIndex}.totalTaxPerType`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>{t('TAG_TOTAL_TAX_PER_TYPE')}</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            type="number"
                                                                                            disabled={true}
                                                                                            {...field}
                                                                                            value={field.value?.toFixed(2)}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />

                                                                    </div>
                                                                    <div className="flex items-center just"><button onClick={() => removeRate(rateIndex)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button></div>
                                                                </div> :
                                                                form.getValues(`items.${Itemindex}.rate.${rateIndex}.rateType`) == 'unit' &&
                                                                <div className="flex gap-4 space-y-2 pt-[10px]">
                                                                    <p className="pt-2">{rateIndex + 1}.</p>
                                                                    <div className="grid md:grid-cols-3 gap-4 w-full">
                                                                        < FormField
                                                                            control={form.control}
                                                                            name={`items.${Itemindex}.rate.${rateIndex}.taxType`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel>{t('TAG_TAX_TYPE')}</FormLabel>
                                                                                    <FormControl>
                                                                                        <Select
                                                                                            disabled={loading}
                                                                                            onValueChange={field.onChange}
                                                                                        // defaultValue={field.value}
                                                                                        // value={field.value ?? ''}
                                                                                        >
                                                                                            <SelectTrigger >
                                                                                                <SelectValue placeholder={t('TAG_TAX_TYPE')} />
                                                                                            </SelectTrigger>
                                                                                            <SelectContent>
                                                                                                <SelectGroup>
                                                                                                    <SelectItem value="Sales">{t('TAG_SALE_TAX')}</SelectItem>
                                                                                                    <SelectItem value="Service">{t('TAG_SERVICE_TAX')}</SelectItem>
                                                                                                    <SelectItem value="Tourism">{t('TAG_TOURISM_TAX')}</SelectItem>
                                                                                                    <SelectItem value="High-Value">{t('TAG_HIGH_VALUE_TAX')}</SelectItem>
                                                                                                    <SelectItem value="Low-Value">{t('TAG_LOW_VALUE_TAX')}</SelectItem>
                                                                                                </SelectGroup>
                                                                                            </SelectContent>
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`items.${Itemindex}.rate.${rateIndex}.noOfUnit`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>{t('TAG_NO_OF_UNITS')}</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                type="number"
                                                                                                {...field}
                                                                                                value={field.value ?? 0}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />

                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`items.${Itemindex}.rate.${rateIndex}.rateUnit`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>{t('TAG_RATE_UNIT')}</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                type="number"
                                                                                                {...field}
                                                                                                value={field.value ?? 0}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>

                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`items.${Itemindex}.rate.${rateIndex}.taxPercentage`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>{t('TAG_TAX')} (%)</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                type="number"
                                                                                                disabled={true}
                                                                                                {...field}
                                                                                                value={field.value?.toFixed(5) ?? 0}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />

                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`items.${Itemindex}.rate.${rateIndex}.totalTaxPerType`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="text-nowrap">{t('TAG_TOTAL_TAX_PER_TYPE')}</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                type="number"
                                                                                                disabled={true}
                                                                                                {...field}
                                                                                                value={field.value?.toFixed(2)}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center just"><button onClick={() => removeRate(rateIndex)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button></div>
                                                                </div >
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                            <Separator />
                            <div className="flex gap-4 space-y-2 pt-[10px]">
                                <p className="pr-2"></p>
                                <div className="grid md:grid-cols-3 gap-4 w-full">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.taxTypeExempted`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="md:text-nowrap">{t('TAG_TAX_TYPE')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={true}
                                                        {...field}
                                                        placeholder={t('TAG_TAX_EXEMPTION')}
                                                        value={t('TAG_TAX_EXEMPTION')}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.amountExempted`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="md:text-nowrap">{t('TAG_AMOUNT_EXEMPTION')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={loading}
                                                        {...field}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.amountOfTaxExempted`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="md:text-nowrap">{t('TAG_AMOUNT_OF_TAX_EXEMPTION')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={true}
                                                        {...field}
                                                        value={form.getValues(`items.${Itemindex}.amountOfTaxExempted`)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="pl-[24px]"> </div>
                            </div>
                            <div className="flex gap-4 space-y-2 pt-[10px]">
                                <p className="pr-2"></p>
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    <div className="col-span-3 ">
                                        <FormField
                                            control={form.control}
                                            name={`items.${Itemindex}.detailOfTaxExemption`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-nowrap">{t('TAG_DETAIL_OF_TAX_EXEMPTED')}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            disabled={loading}
                                                            {...field}
                                                            value={field.value}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <p className="pl-[24px]"></p>
                            </div>
                        </div>

                        <div className="pt-[30px]">
                            <h1 className="text-xl font-semibold">{t('TAG_SUMMARY')}</h1>
                            <Separator />
                            <div className="grid grid-cols-3 gap-8 pt-[10px] pl-4">
                                <div className="grid grid-rows-2 gap-1">
                                    <p>{t('TAX_SUB_TOTAL')}</p>
                                    <p className="pl-3">{form.getValues(`items.${Itemindex}.subTotal`)?.toFixed(2)}</p>
                                </div>
                                <div className="grid grid-rows-2 gap-1">
                                    <p>{t('TAG_TOTAL_DISCOUNT_AMOUNT')}</p>
                                    <p className="pl-3">{form.getValues(`items.${Itemindex}.totalDiscount`)?.toFixed(2)}</p>
                                </div>
                                <div className="grid grid-rows-2 gap-1">
                                    <p>{t('TAG_TOTAL_FEES_AND_CHARGES')}</p>
                                    <p className="pl-3">{form.getValues(`items.${Itemindex}.totalCharge`)?.toFixed(2)}</p>
                                </div>
                                <div className="grid grid-rows-2 gap-1">
                                    <p>{t('TAG_TOTAL_EXCLUDING_TAX_AMOUNT')}</p>
                                    <p className="pl-3">{form.getValues(`items.${Itemindex}.taxableAmount`)?.toFixed(2)}</p>
                                </div>
                                <div className="grid grid-rows-2 gap-1">
                                    <p>{t('TAG_AMOUNT_EXEMPTED_FROM_TAX')}</p>
                                    <p className="pl-3">{Number(form.getValues(`items.${Itemindex}.amountExempted`)).toFixed(2)}</p>
                                </div>
                                <div className="grid grid-rows-2 gap-1">
                                    <p>{t('TAG_TOTAL_TAX_AMOUNT')}</p>
                                    <p className="pl-3">{form.getValues(`items.${Itemindex}.totalTaxAmount`)?.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-[20px]">
                            <Button type="submit" className="bg-blue-800 hover:bg-blue-900" onClick={() => HandleSubmitLineItem()}>{t('TAG_CONFIRM')}</Button>
                        </div>
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </SheetContent >
        </Sheet>
    )
}