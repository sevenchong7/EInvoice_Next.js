import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DocumentFormValues } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { Controller, FieldArrayWithId, useFieldArray, UseFieldArrayRemove, useForm, UseFormReturn } from 'react-hook-form';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function DocumentFormStep3({ form }: { form: UseFormReturn<DocumentFormValues> }) {

    const {
        control,
        formState: { errors }
    } = form;

    const {
        append: appendItems,
        remove: removeItems,
        fields: fieldsItems,
    } = useFieldArray({
        control,
        name: 'items',
    });

    const HandleAddItems = () => {
        appendItems({
            itemId: '',
            itemPrice: 0,
            quantity: 0,
            unitCode: '',
            classificationCode: '',
            classificationType: '',
            description: '',
            madeIn: '',
            allowanceCharge: [
                {
                    discountCharge: '',
                    allowanceChargeReason: '',
                    chargeDiscountPercent: 0,
                    amount: 0
                }
            ],
            taxableAmount: 0,
            taxSubtotal: [
                {
                    taxType: '',
                    taxPercentage: 0,
                    taxAmount: 0
                }
            ],
            subTotal: 0,
            totalDiscount: 0,
            totalCharge: 0,
            totalTaxAmount: 0,
        })
    }

    return (
        <>
            <div className='space-y-5'>
                {
                    fieldsItems?.map((Itemfield, Itemindex) => {
                        return (
                            <DocumentItemComponent key={Itemfield.id} removeItems={removeItems} form={form} Itemindex={Itemindex} Itemfield={Itemfield} />
                        )
                    })
                }

                <div className='flex flex-col w-full items-center justify-center'>
                    <Button onClick={() => { HandleAddItems() }}>+ Add New</Button>
                </div>
            </div>

        </>
    )
}

const DocumentItemComponent = ({ removeItems, form, Itemindex, Itemfield }: { removeItems: UseFieldArrayRemove, form: UseFormReturn<DocumentFormValues>, Itemfield: FieldArrayWithId<DocumentFormValues>, Itemindex: number, }) => {
    const [loading, setLoading] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [taxableAmount, setTaxableAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalCharge, setTotalCharge] = useState(0);

    const {
        control,
        formState: { errors }
    } = form;

    const {
        append: appendAllowanceCharge,
        remove: removeAllowanceCharge,
        fields: fieldsAllowanceCharge,
    } = useFieldArray({
        control,
        name: `items.${Itemindex}.allowanceCharge`,
    });

    const {
        append: appendTaxSubtotal,
        remove: removeTaxSubtotal,
        fields: fieldsTaxSubtotal,
    } = useFieldArray({
        control,
        name: `items.${Itemindex}.taxSubtotal`,
    });


    const HandleAddAllowanceCharge = () => {
        appendAllowanceCharge({
            discountCharge: '',
            allowanceChargeReason: '',
            chargeDiscountPercent: 0,
            amount: 0
        })
    }

    const HandleAddTaxSubtotal = () => {
        appendTaxSubtotal({
            taxType: '',
            taxPercentage: 0,
            taxAmount: 0,
        })
    }

    useEffect(() => {
        const subTotal = (form.getValues(`items.${Itemindex}.itemPrice`) * form.getValues(`items.${Itemindex}.quantity`))
        form.setValue(`items.${Itemindex}.subTotal`, subTotal);
        setSubTotal(subTotal);

    }, [form.getFieldState(`items`)])

    useEffect(() => {
        console.log("cal taxable amount")
        const taxableAmount = (form.getValues(`items.${Itemindex}.itemPrice`) * form.getValues(`items.${Itemindex}.quantity`)) - totalDiscount + totalCharge
        form.setValue(`items.${Itemindex}.taxableAmount`, taxableAmount);
        setTaxableAmount(taxableAmount);

    }, [form.getFieldState(`items`)])

    useEffect(() => {

        const calculateTotalAmount = () => {
            let sumDiscount = 0;
            let sumCharge = 0;

            const allowanceCharges = form.getValues(`items.${Itemindex}.allowanceCharge`);
            allowanceCharges.forEach((charge, chargeIndex) => {

                console.log("cal allowanceCharge amount")
                if (form.getValues(`items.${Itemindex}.allowanceCharge.${chargeIndex}.discountCharge`) == 'charge') {
                    const amount = ((form.getValues(`items.${Itemindex}.itemPrice`) * form.getValues(`items.${Itemindex}.quantity`)) * form.getValues(`items.${Itemindex}.allowanceCharge.${chargeIndex}.chargeDiscountPercent`) / 100);
                    form.setValue(`items.${Itemindex}.allowanceCharge.${chargeIndex}.amount`, amount);
                    sumCharge += amount;
                    form.setValue(`items.${Itemindex}.totalCharge`, sumCharge);
                    setTotalCharge(sumCharge)

                } else if (form.getValues(`items.${Itemindex}.allowanceCharge.${chargeIndex}.discountCharge`) == 'discount') {
                    const amount = ((form.getValues(`items.${Itemindex}.itemPrice`) * form.getValues(`items.${Itemindex}.quantity`)) * form.getValues(`items.${Itemindex}.allowanceCharge.${chargeIndex}.chargeDiscountPercent`) / 100);
                    form.setValue(`items.${Itemindex}.allowanceCharge.${chargeIndex}.amount`, amount);
                    sumDiscount += amount;
                    form.setValue(`items.${Itemindex}.totalDiscount`, sumDiscount);
                    setTotalDiscount(sumDiscount)
                }

            });
        };

        calculateTotalAmount();
    }, [form.getFieldState(`items.${Itemindex}.allowanceCharge`)]);

    useEffect(() => {
        let sum = 0;
        const taxSubtotal = form.getValues(`items.${Itemindex}.taxSubtotal`);
        taxSubtotal.forEach((value, index) => {
            const amount = form.getValues(`items.${Itemindex}.taxableAmount`) * form.getValues(`items.${Itemindex}.taxSubtotal.${index}.taxPercentage`) / 100;
            form.setValue(`items.${Itemindex}.taxSubtotal.${index}.taxAmount`, amount)
            sum += amount
        })

        setTotalAmount(sum);
        form.setValue(`items.${Itemindex}.totalTaxAmount`, sum);

    }, [form.getFieldState(`items.${Itemindex}.taxSubtotal`)])

    return (
        <div className='border px-[10px]'>

            <Accordion
                type='single'
                collapsible
                defaultValue='item-1'
                key={Itemfield.id}
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger
                        className={cn(
                            'relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden',
                            errors?.items?.[Itemindex] && 'text-red-700'
                        )}>

                        <h1 className="text-2xl">
                            {`Items ${Itemindex + 1}`}
                        </h1>

                        {Itemindex != 0 &&
                            <Button
                                // variant="outline"
                                size="icon"
                                className="absolute right-8"
                                onClick={() => removeItems(Itemindex)}
                            >
                                <Trash2Icon className="h-4 w-4 " />
                            </Button>
                        }

                        {errors?.items?.[Itemindex] && (
                            <span className="alert absolute right-8">
                                <AlertTriangleIcon className="h-4 w-4 text-red-700" />
                            </span>
                        )}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-[20px]">
                            <h1 className="text-2xl font-semibold">Party Information</h1>
                            <div className="w-full h-[1px] bg-gray-300"></div>
                            <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                                <FormField
                                    control={form.control}
                                    name={`items.${Itemindex}.itemId`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>item ID <span className='text-red-500'>*</span></FormLabel>
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

                                <FormField
                                    control={form.control}
                                    name={`items.${Itemindex}.itemPrice`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Item Price <span className='text-red-500'>*</span></FormLabel>
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
                                <div />

                                <FormField
                                    control={form.control}
                                    name={`items.${Itemindex}.quantity`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity <span className='text-red-500'>*</span></FormLabel>
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
                                    name={`items.${Itemindex}.unitCode`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit Code <span className='text-red-500'>*</span></FormLabel>
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
                                <div />

                                <FormField
                                    control={form.control}
                                    name={`items.${Itemindex}.classificationCode`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Classification Code <span className='text-red-500'>*</span></FormLabel>
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

                                <FormField
                                    control={form.control}
                                    name={`items.${Itemindex}.classificationType`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Classification Type <span className='text-red-500'>*</span></FormLabel>
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
                                <div />

                                <FormField
                                    control={form.control}
                                    name={`items.${Itemindex}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
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

                                <FormField
                                    control={form.control}
                                    name={`items.${Itemindex}.madeIn`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Made In</FormLabel>
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
                                <div />

                            </div>

                            {fieldsAllowanceCharge.map((allowanceChargeFields, allowanceChargeIndex) => (
                                <div key={allowanceChargeFields.id}>
                                    <div className="pt-[20px]">
                                        <div className='flex flex-row w-full justify-between'>
                                            <h1 className="text-2xl font-semibold">Allowance Charge</h1>
                                            {allowanceChargeIndex == 0 ?
                                                <button onClick={() => {
                                                    HandleAddAllowanceCharge()
                                                }} className="bg-black text-white rounded-full w-[30px] h-[30px] hover:bg-gray-700">+</button> :
                                                <button onClick={() => { removeAllowanceCharge(allowanceChargeIndex) }} className="bg-black text-white rounded-full w-[30px] h-[30px] hover:bg-gray-700">-</button>
                                            }
                                        </div>
                                        <div className="w-full h-[1px] bg-gray-300" />
                                        <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.allowanceCharge.${allowanceChargeIndex}.discountCharge`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Discount/Charge</FormLabel>
                                                        <FormControl>

                                                            <Select
                                                                disabled={loading}
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            defaultValue={field.value}
                                                                            placeholder="Select a type"
                                                                        />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>

                                                                    <SelectItem value='discount'>
                                                                        Discount
                                                                    </SelectItem>

                                                                    <SelectItem value='charge'>
                                                                        Charge
                                                                    </SelectItem>

                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.allowanceCharge.${allowanceChargeIndex}.allowanceChargeReason`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Allowance Charge Reason</FormLabel>
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
                                            <div />

                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.allowanceCharge.${allowanceChargeIndex}.chargeDiscountPercent`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Charge/Discount (%) <span className='text-red-500'>*</span></FormLabel>
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
                                                name={`items.${Itemindex}.allowanceCharge.${allowanceChargeIndex}.amount`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Amount</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder='Price * Quantity * Charge/Disc'
                                                                disabled={true}
                                                                {...field}
                                                                value={form.getValues(`items.${Itemindex}.allowanceCharge.${allowanceChargeIndex}.amount`)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-[20px]">
                                <div className='flex flex-row w-full justify-between'>
                                    <h1 className="text-2xl font-semibold">Taxable Amount</h1>
                                </div>
                                <div className="w-full h-[1px] bg-gray-300" />
                                <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                                    <FormField
                                        control={form.control}
                                        name={`items.${Itemindex}.taxableAmount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Taxable Amount</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder='(Price * Quantity) - Discount +  Charge'
                                                        disabled={true}
                                                        {...field}
                                                        value={taxableAmount}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>


                            {fieldsTaxSubtotal.map((taxSubtotalFields, taxSubtotalIndex) => (
                                <div key={taxSubtotalFields.id}>
                                    <div className="pt-[20px]">
                                        <div className='flex flex-row w-full justify-between'>
                                            <h1 className="text-2xl font-semibold">Tax Subtotal</h1>
                                            {taxSubtotalIndex == 0 ?
                                                <button onClick={() => {
                                                    HandleAddTaxSubtotal()
                                                }} className="bg-black text-white rounded-full w-[30px] h-[30px] hover:bg-gray-700">+</button> :
                                                <button onClick={() => { removeTaxSubtotal(taxSubtotalIndex) }} className="bg-black text-white rounded-full w-[30px] h-[30px] hover:bg-gray-700">-</button>
                                            }
                                        </div>
                                        <div className="w-full h-[1px] bg-gray-300" />
                                        <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.taxSubtotal.${taxSubtotalIndex}.taxType`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tax Type</FormLabel>
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

                                            <FormField
                                                control={form.control}
                                                name={`items.${Itemindex}.taxSubtotal.${taxSubtotalIndex}.taxPercentage`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tax Percentage</FormLabel>
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
                                                name={`items.${Itemindex}.taxSubtotal.${taxSubtotalIndex}.taxAmount`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tax Amount</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                disabled={true}
                                                                {...field}
                                                                value={form.getValues(`items.${Itemindex}.taxSubtotal.${taxSubtotalIndex}.taxAmount`)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-[20px]">
                                <div className='flex flex-row w-full justify-between'>
                                    <h1 className="text-2xl font-semibold">Summary</h1>
                                </div>
                                <div className="w-full h-[1px] bg-gray-300" />
                                <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                                    <div>
                                        <h2>Sub Total</h2>
                                        <p className='text-gray-400 pl-[10px] '>{subTotal}</p>
                                    </div>
                                    <div>
                                        <h2>Total Discount</h2>
                                        <p className='text-gray-400 pl-[10px] '>{totalDiscount}</p>
                                    </div>
                                    <div />
                                    <div>
                                        <h2>Total Charge</h2>
                                        <p className='text-gray-400 pl-[10px] '>{totalCharge}</p>
                                    </div>
                                    <div>
                                        <h2>Total Tax Amount</h2>
                                        <p className='text-gray-400 pl-[10px] '>{totalAmount}</p>
                                    </div>
                                    <div />
                                </div>
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div >
    )
}