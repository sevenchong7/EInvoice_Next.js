import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DocumentFormValues } from "@/lib/form-schema";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

export default function DocumentFormStep5({ form }: { form: UseFormReturn<DocumentFormValues> }) {


    return (
        <>
            <div className="pt-[20px]">
                <h1 className="text-2xl font-semibold">Summary</h1>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="flex flex-col p-[20px] w-full">

                    <div className="flex flex-col w-full bg-gray-100 rounded-md">
                        <div className="flex-1 gap-8 md:grid md:grid-cols-3 p-[20px] w-full">
                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>
                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>
                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>

                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>
                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>
                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>

                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>
                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>
                            <div className="border bg-white text-blue-800 rounded-md w-full p-[10px]">
                                <p>Total Adjusted Amount:</p>
                                <h1 className="flex items-center justify-center py-[20px]">test</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col pt-[20px] w-full">
                        <div className="flex flex-col w-full border bg-white rounded-md">
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
                                            Basic Information
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Invoice Information:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Invoice ID:</div>
                                                            <div>{form.getValues('invoiceId')}</div>

                                                            <div>Issued Date:</div>
                                                            <div>{form.getValues('issuesDateTime')}</div>

                                                            <div>Currency Code:</div>
                                                            <div>{form.getValues('currencyCode')}</div>

                                                            <div>Invoice Type:</div>
                                                            <div>{form.getValues('invoiceType')}</div>

                                                            <div>Version ID:</div>
                                                            <div>{form.getValues('versionId')}</div>
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Invoice Period:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Start Date:</div>
                                                            <div>{form.getValues('startdate')}</div>

                                                            <div>End Date:</div>
                                                            <div>{form.getValues('enddate')}</div>

                                                            <div>Description:</div>
                                                            <div>{form.getValues('description')}</div>
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Billing Preference:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Invoice Doc Reference:</div>
                                                            <div>{form.getValues('invoiceDocRef')}</div>

                                                            <div>Additional Invoice Doc Reference:</div>
                                                            <div>{form.getValues('additionalInvoiceDocRef')}</div>
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
                        <div className="flex flex-col w-full border bg-white rounded-md">
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
                                            Supplier Information
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Account Information:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Supplier ID:</div>
                                                            <div>{form.getValues('supplierId')}</div>

                                                            <div>Agency Name:</div>
                                                            <div>{form.getValues('agencyName')}</div>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Party Information:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Industry Classification Code:</div>
                                                            <div>{form.getValues('supplierIndustryClassCode')}</div>

                                                            <div>Industry Name:</div>
                                                            <div>{form.getValues('supplierIndustryName')}</div>

                                                            <div>Registration Name:</div>
                                                            <div>{form.getValues('supplierRegisterName')}</div>

                                                            {
                                                                form.getValues('supplierPartyInformation').map((value, index) => (
                                                                    <div key={index} className="col-span-2 gap-8 md:grid md:grid-cols-2 w-full">
                                                                        <div>Identification ID:</div>
                                                                        <div>{form.getValues(`supplierPartyInformation.${index}.supplierIdentificationId`)}</div>

                                                                        <div>Scheme ID:</div>
                                                                        <div>{form.getValues(`supplierPartyInformation.${index}.supplierSchemeId`)}</div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div></div>

                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Address:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            {
                                                                form.getValues(`supplierAddress`).map((value, index) => (
                                                                    <div key={index} className="col-span-2 gap-8 md:grid md:grid-cols-2 w-full">
                                                                        <div key={index}>Line {index + 1}:</div>
                                                                        <div>{form.getValues(`supplierAddress.${index}.supplierLine`)}</div>
                                                                    </div >
                                                                ))
                                                            }
                                                            <div>Zip Code:</div>
                                                            <div>{form.getValues('supplierZipCode')}</div>

                                                            <div>City:</div>
                                                            <div>{form.getValues('supplierCity')}</div>

                                                            <div>State:</div>
                                                            <div>{form.getValues('supplierState')}</div>

                                                            <div>Country:</div>
                                                            <div>{form.getValues('supplierCountry')}</div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Contact:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Contact No.:</div>
                                                            <div>{form.getValues('supplierContact')}</div>

                                                            <div>Email:</div>
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
                        <div className="flex flex-col w-full border bg-white rounded-md">
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
                                            Buyer Information
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">

                                                <div>
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Party Information:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Registration Name:</div>
                                                            <div>{form.getValues('buyerRegisterName')}</div>

                                                            {
                                                                form.getValues('buyerPartyInformation').map((value, index) => (
                                                                    <div key={index} className="col-span-2 gap-8 md:grid md:grid-cols-2 w-full">
                                                                        <div>Identification ID:</div>
                                                                        <div>{form.getValues(`buyerPartyInformation.${index}.buyerIdentificationId`)}</div>

                                                                        <div>Scheme ID:</div>
                                                                        <div >{form.getValues(`buyerPartyInformation.${index}.buyerSchemeId`)}</div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Address:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            {
                                                                form.getValues(`buyerAddress`).map((value, index) => (
                                                                    <div key={index} className="col-span-2 gap-8 md:grid md:grid-cols-2 w-full">
                                                                        <div>Line {index + 1}:</div>
                                                                        <div>{form.getValues(`buyerAddress.${index}.buyerLine`)}</div>
                                                                    </div>
                                                                ))
                                                            }

                                                            <div>Zip Code:</div>
                                                            <div>{form.getValues('buyerZipCode')}</div>

                                                            <div>City:</div>
                                                            <div>{form.getValues('buyerCity')}</div>

                                                            <div>State:</div>
                                                            <div>{form.getValues('buyerState')}</div>

                                                            <div>Country:</div>
                                                            <div>{form.getValues('buyerCountry')}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Contact:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Contact No.:</div>
                                                            <div>{form.getValues('buyerContact')}</div>

                                                            <div>Email:</div>
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
                        <div className="flex flex-col w-full border bg-white rounded-md">
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
                                            Delivery Information
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Party Information:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Registration Name:</div>
                                                            <div>{form.getValues('deliveryRegistrationName')}</div>
                                                            {
                                                                form.getValues('deliverypartyInformation').map((value, index) => (
                                                                    <div key={index} className="col-span-2 gap-8 md:grid md:grid-cols-2 w-full">
                                                                        <div>Identification ID:</div>
                                                                        <div>{form.getValues(`deliverypartyInformation.${index}.deliveryIdentificationId`)}</div>

                                                                        <div>Scheme ID:</div>
                                                                        <div>{form.getValues(`deliverypartyInformation.${index}.deliverySchemeId`)}</div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Address:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            {
                                                                form.getValues(`deliveryAddress`).map((value, index) => (
                                                                    <div key={index} className="col-span-2 gap-8 md:grid md:grid-cols-2 w-full">
                                                                        <div>Line {index + 1}:</div>
                                                                        <div>{form.getValues(`deliveryAddress.${index}.deliveryLine`)}</div>
                                                                    </div>
                                                                ))
                                                            }
                                                            <div>Zip Code:</div>
                                                            <div>{form.getValues('deliveryZipCode')}</div>

                                                            <div>City:</div>
                                                            <div>{form.getValues('deliveryCity')}</div>

                                                            <div>State:</div>
                                                            <div>{form.getValues('deliveryState')}</div>

                                                            <div>Country:</div>
                                                            <div>{form.getValues('deliveryCountry')}</div>

                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Shipment:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Shipment ID:</div>
                                                            <div>{form.getValues('deliveryShipmentId')}</div>

                                                            <div>Allownce Charge Reason:</div>
                                                            <div>{form.getValues('deliveryAllowanceChargeReason')}</div>

                                                            <div>Amount:</div>
                                                            <div>{form.getValues('deliveryAmount')}</div>
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

                    {
                        form.getValues("items").map((value, index) => (
                            <div key={index} className="flex flex-col pt-[20px] w-full">
                                <div className="flex flex-col w-full border bg-white rounded-md">
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
                                                    Invoice Item {index + 1}
                                                </h1>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="px-[30px]">
                                                    <div className="space-y-2">

                                                        <div className="pt-[20px]">
                                                            <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                                <h1 className="text-2xl">Item Information:</h1>
                                                                <div></div>
                                                                <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full ">
                                                                    <div>Item ID:</div>
                                                                    <div>{form.getValues(`items.${index}.itemId`)}</div>

                                                                    <div>Item Price:</div>
                                                                    <div>{form.getValues(`items.${index}.itemPrice`)}</div>

                                                                    <div>Quantity:</div>
                                                                    <div>{form.getValues(`items.${index}.quantity`)}</div>

                                                                    <div>Unit Code:</div>
                                                                    <div>{form.getValues(`items.${index}.unitCode`)}</div>

                                                                    <div>Classification Code:</div>
                                                                    <div>{form.getValues(`items.${index}.classificationCode`)}</div>

                                                                    <div>Classification Type:</div>
                                                                    <div>{form.getValues(`items.${index}.classificationType`)}</div>

                                                                    <div>Description:</div>
                                                                    <div>{form.getValues(`items.${index}.description`)}</div>

                                                                    <div>Made In:</div>
                                                                    <div>{form.getValues(`items.${index}.madeIn`)}</div>
                                                                </div>

                                                                <div />
                                                            </div>
                                                        </div>

                                                        <div >
                                                            <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                                <h1 className="text-2xl">Allowance Charge:</h1>
                                                                <h1 className="text-2xl">Tax:</h1>
                                                                <div className="flex-1 gap-5 md:grid md:grid-row-none md:auto-rows-min w-full">
                                                                    {
                                                                        form.getValues(`items.${index}.allowanceCharge`).map((value, allowanceChargeIndex) => (
                                                                            <div key={index} className="flex-1 gap-8 md:grid md:grid-cols-2 w-full border-b-2 border-dotted border-black">
                                                                                <div>Discount / Charge: </div>
                                                                                <div>{form.getValues(`items.${index}.allowanceCharge.${allowanceChargeIndex}.discountCharge`)}</div>

                                                                                <div>Allowance Charge Reason: </div>
                                                                                <div>{form.getValues(`items.${index}.allowanceCharge.${allowanceChargeIndex}.allowanceChargeReason`)}</div>

                                                                                <div>Charge / Discount (%): </div>
                                                                                <div>{form.getValues(`items.${index}.allowanceCharge.${allowanceChargeIndex}.chargeDiscountPercent`)}</div>

                                                                                <div>Amount: </div>
                                                                                <div>{form.getValues(`items.${index}.allowanceCharge.${allowanceChargeIndex}.amount`)}</div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>

                                                                <div className="flex-1 gap-5 md:grid md:grid-row-none md:auto-rows-min w-full">
                                                                    {
                                                                        form.getValues(`items.${index}.taxSubtotal`).map((value, taxSubtotalIndex) => (
                                                                            <div key={index} className="flex-1 gap-8 md:grid md:grid-cols-2 w-full border-b-2 border-dotted border-black">
                                                                                <div>Taxable Amount: </div>
                                                                                <div>{form.getValues(`items.${index}.taxableAmount`)}</div>

                                                                                <div>Tax Type: </div>
                                                                                <div>{form.getValues(`items.${index}.taxSubtotal.${taxSubtotalIndex}.taxType`)}</div>

                                                                                <div>Tax (%): </div>
                                                                                <div>{form.getValues(`items.${index}.taxSubtotal.${taxSubtotalIndex}.taxPercentage`)}</div>

                                                                                <div>Tax Amount: </div>
                                                                                <div>{form.getValues(`items.${index}.taxSubtotal.${taxSubtotalIndex}.taxAmount`)}</div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>


                                                            </div>
                                                        </div>

                                                        <div className="pt-[20px]">
                                                            <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                                <h1 className="text-2xl">Sammary:</h1>
                                                                <div></div>

                                                                <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                                    <div>Sub-Total:</div>
                                                                    <div>{form.getValues(`items.${index}.subTotal`)}</div>

                                                                    <div>Total Discount:</div>
                                                                    <div>{form.getValues(`items.${index}.totalDiscount`)}</div>

                                                                    <div>Total Charge:</div>
                                                                    <div>{form.getValues(`items.${index}.totalCharge`)}</div>

                                                                    <div>Total Tax Amount:</div>
                                                                    <div>{form.getValues(`items.${index}.totalTaxAmount`)}</div>
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
                        ))
                    }

                    <div className="flex flex-col pt-[20px] w-full">
                        <div className="flex flex-col w-full border bg-white rounded-md">
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
                                            Additional Information
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-[30px]">
                                            <div className="space-y-2">

                                                <div>
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Payment Information:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-5 md:grid md:grid-row-none md:auto-rows-min w-full">

                                                            {
                                                                form.getValues('paymentInformation').map((value, index) => (
                                                                    <div key={index} className="flex-1 gap-8 md:grid md:grid-cols-2 w-full border-b-2 border-dotted border-black">

                                                                        <div>Payment Type:</div>
                                                                        <div>{form.getValues(`paymentInformation.${index}.paymentType`)}</div>

                                                                        <div>Payment Financial Account:</div>
                                                                        <div>{form.getValues(`paymentInformation.${index}.paymentFinancialAcc`)}</div>

                                                                        <div>Payment Term:</div>
                                                                        <div>{form.getValues(`paymentInformation.${index}.paymentTerms`)}</div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div >
                                                    </div >

                                                </div>

                                                <div className="pt-[20px]">
                                                    <div className="flex-1 gap-5 md:grid md:grid-cols-2 w-full pt-[20px]">
                                                        <h1 className="text-2xl">Prepaid Payment Information:</h1>
                                                        <div></div>
                                                        <div className="flex-1 gap-8 md:grid md:grid-cols-2 w-full">
                                                            <div>Payment Invoice ID:</div>
                                                            <div>{form.getValues('paymentInvoiceId')}</div>

                                                            <div>Payment Amount:</div>
                                                            <div>{form.getValues('paymentAmount')}</div>

                                                            <div>Issued Date Time:</div>
                                                            <div>{form.getValues('paymentIssuedDateTime')}</div>
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
            </div>
        </>
    )
}