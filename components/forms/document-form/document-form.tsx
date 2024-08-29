'use client';
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
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { documentFormSchema, DocumentFormValues, profileSchema, RegisterFormValues, registerSchema, RegisterUserAdminFormValues, registerUserAdminSchema, type ProfileFormValues } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';
import { useParams, useRouter, } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import DocumentFormStep1 from './document-form-step1';
import DocumentFormStep2 from './document-form-step2';
import DocumentFormStep3 from './document-form-step3';
import DocumentFormStep4 from './document-form-step4';
import DocumentFormStep5 from './document-form-step5';
import { useStore } from '@/action/action';


interface ProfileFormType {
    initialData: any | null;
    categories: any;
}

export const DocumentForm: React.FC<ProfileFormType> = ({
    initialData,
    categories
}) => {
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const headerTitle = "Create Document"
    const headerDescription = 'Generate and prepare the necessary document for submission to LHDN with ease.';
    // const toastMessage = initialData ? 'Product updated.' : 'Product created.';
    // const action = initialData ? 'Save changes' : 'Create';
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({});
    const delta = currentStep - previousStep;

    const { setDocData } = useStore()

    const defaultValues = {
        invoiceId: "",
        issuesDateTime: "",
        currencyCode: "",
        invoiceType: "",
        versionId: "",
        startdate: "",
        enddate: "",
        description: "",
        invoiceDocRef: "",
        additionalInvoiceDocRef: "",
        supplierId: '',
        agencyName: '',
        supplierIndustryClassCode: '',
        supplierIndustryName: '',
        supplierRegisterName: '',
        supplierPartyInformation: [
            {
                supplierIdentificationId: '',
                supplierSchemeId: '',
            }
        ],
        supplierAddress: [
            {
                supplierLine: '',
            }
        ],
        supplierZipCode: '',
        supplierCity: '',
        supplierState: '',
        supplierCountry: '',
        supplierContact: '',
        supplierEmail: '',
        buyerIndustryClassCode: '',
        buyerIndustryName: '',
        buyerRegisterName: '',
        buyerPartyInformation: [
            {
                buyerIdentificationId: '',
                buyerSchemeId: ''
            }
        ],
        buyerAddress: [
            {
                buyerLine: '',
            }
        ],
        buyerZipCode: '',
        buyerCity: '',
        buyerState: '',
        buyerCountry: '',
        buyerContact: '',
        buyerEmail: '',
        deliveryRegistrationName: '',
        deliverypartyInformation: [
            {
                deliveryIdentificationId: '',
                deliverySchemeId: '',
            }
        ],
        deliveryAddress: [
            {
                deliveryLine: '',
            }
        ],
        deliveryZipCode: '',
        deliveryCity: '',
        deliveryState: '',
        deliveryCountry: '',
        deliveryShipmentId: '',
        deliveryAllowanceChargeReason: '',
        deliveryCurrency: '',
        deliveryAmount: 0,
        items: [
            {
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
                        ammount: 0,
                    }
                ],
                taxableAmount: 0,
                taxSubtotal: [
                    {
                        taxType: '',
                        taxPercentage: 0,
                        taxAmmount: 0,
                    }
                ],
                subTotal: 0,
                totalDiscount: 0,
                totalCharge: 0,
                totalTaxAmount: 0,
            }
        ],
        paymentInformation: [
            {
                paymentType: '',
                paymentFinancialAcc: '',
                paymentTerms: ''
            }
        ],
        paymentInvoiceId: '',
        paymentAmount: '',
        paymentIssuedDateTime: '',
    }

    const form = useForm<DocumentFormValues>({
        resolver: zodResolver(documentFormSchema),
        defaultValues,
        mode: 'onChange'
    });

    const {
        control,
        formState: { errors }
    } = form;

    const {
        fields: fieldsSupplierPartyInformation,
    } = useFieldArray({
        control,
        name: 'supplierPartyInformation',
    });

    const {
        fields: fieldsSupplierAddress,
    } = useFieldArray({
        control,
        name: 'supplierAddress',
    });

    const {
        fields: fieldsBuyerPartyInformation
    } = useFieldArray({
        control,
        name: 'buyerPartyInformation'
    })

    const {
        fields: fieldsBuyerAddress
    } = useFieldArray({
        control,
        name: 'buyerAddress'
    })

    const {
        fields: fieldsDeliverypartyInformation,
    } = useFieldArray({
        control,
        name: 'deliverypartyInformation'
    })

    const {
        fields: fieldsDeliveryAddress,
    } = useFieldArray({
        control,
        name: 'deliveryAddress'
    })

    const {
        fields: fieldsItems,
    } = useFieldArray({
        control,
        name: 'items'
    })

    const {
        fields: fieldsPaymentInformation,
    } = useFieldArray({
        control,
        name: 'paymentInformation'
    })

    const steps = [
        {
            id: 'Step 1',
            name: 'Basic Information',
            fields: ["invoiceId", "issuesDateTime", "currencyCode", "invoiceType", "versionId", "startdate", "enddate", "invoiceDocRef", "additionalInvoiceDocRef", "description"]
        },
        {
            id: 'Step 2',
            name: 'Supplier & Buyer',
            fields: [
                'supplierId',
                'agencyName',
                'supplierIndustryClassCode',
                'supplierIndustryName',
                'supplierRegisterName',
                ...fieldsSupplierPartyInformation?.map((_, index) => [
                    `supplierPartyInformation.${index}.supplierIdentificationId`,
                    `supplierPartyInformation.${index}.supplierSchemeId`,
                ]).flat(),
                ...fieldsSupplierAddress?.map((_, index) => [
                    `supplierAddress.${index}.supplierLine`,
                ]).flat(),
                'supplierZipCode',
                'supplierCity',
                'supplierState',
                'supplierCountry',
                'supplierContact',
                'supplierEmail',
                'buyerIndustryClassCode',
                'buyerIndustryName',
                'buyerRegisterName',
                ...fieldsBuyerPartyInformation?.map((_, index) => [
                    `buyerPartyInformation.${index}.buyerIdentificationId`,
                    `buyerPartyInformation.${index}.buyerSchemeId`,
                ]).flat(),
                ...fieldsBuyerAddress?.map((_, index) => [
                    `buyerAddress.${index}.buyerLine`,
                ]).flat(),
                'buyerZipCode',
                'buyerCity',
                'buyerState',
                'buyerCountry',
                'buyerContact',
                'buyerEmail',
                'deliveryRegistrationName',
                ...fieldsDeliverypartyInformation?.map((_, index) => [
                    `deliverypartyInformation.${index}.deliveryIdentificationId`,
                    `deliverypartyInformation.${index}.deliverySchemeId`,
                ]).flat(),
                ...fieldsDeliveryAddress?.map((_, index) => [
                    `deliveryAddress.${index}.deliveryLine`,
                ]).flat(),
                'deliveryZipCode',
                'deliveryCity',
                'deliveryState',
                'deliveryCountry',
                'deliveryShipmentId',
                'deliveryAllowanceChargeReason',
                'deliveryCurrency',
                'deliveryAmount'
            ]
        },
        {
            id: 'Step 3',
            name: 'Line Items',
            fields: [
                ...fieldsItems?.map((_, index) => {

                    const { fields: fieldsItemsAllowanceCharge } = useFieldArray({
                        control,
                        name: `items.${index}.allowanceCharge`
                    })

                    const { fields: fieldsTaxSubtotal } = useFieldArray({
                        control,
                        name: `items.${index}.taxSubtotal`
                    })

                    return [
                        `items.${index}.itemId`,
                        `items.${index}.itemPrice`,
                        `items.${index}.quantity`,
                        `items.${index}.unitCode`,
                        `items.${index}.classificationCode`,
                        `items.${index}.classificationType`,
                        `items.${index}.description`,
                        `items.${index}.madeIn`,
                        ...fieldsItemsAllowanceCharge.map((_, allowanceIndex) => [
                            `items.${index}.allowanceCharge.${allowanceIndex}.discountCharge`,
                            `items.${index}.allowanceCharge.${allowanceIndex}.allowanceChargeReason`,
                            `items.${index}.allowanceCharge.${allowanceIndex}.chargeDiscountPercent`,
                            `items.${index}.allowanceCharge.${allowanceIndex}.amount`
                        ]).flat(),
                        `items.${index}.taxableAmount`,
                        ...fieldsTaxSubtotal.map((_, taxIndex) => [
                            `items.${index}.taxSubtotal.${taxIndex}.taxType`,
                            `items.${index}.taxSubtotal.${taxIndex}.taxPercentage`,
                            `items.${index}.taxSubtotal.${taxIndex}.taxAmount`,
                        ]).flat(),
                    ]
                }
                ).flat()
            ]
        },
        {
            id: 'Step 4',
            name: 'Additional Information',
            fields: [
                ...fieldsPaymentInformation.map((_, index) => [
                    `paymentInformation${index}.paymentType`,
                    `paymentInformation${index}.paymentFinancialAcc`,
                    `paymentInformation${index}.paymentTerms`,
                ]).flat(),
                "paymentInvoiceId",
                "paymentAmount",
                "issuedDateTime",
            ]
        },
        {
            id: 'Step 5',
            name: 'Summary & Submit'
        }
    ];

    const onSubmit = async (data: DocumentFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                // await axios.post(`/ api / products / edit - product / ${ initialData._id }`, data);
            } else {
                // const res = await axios.post(`/ api / products / create - product`, data);
                // console.log("product", res);
            }
            router.refresh();
            router.push(`/ dashboard / products`);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            //   await axios.delete(`/ api / ${ params.storeId } / products / ${ params.productId }`);
            router.refresh();
            router.push(`/ ${params.storeId} / products`);
        } catch (error: any) {
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };



    const processForm: SubmitHandler<DocumentFormValues> = (data) => {
        console.log('test')
        console.log('data ==>', data);
        setData(data);
        router.push("/dashboard/document/createDocument/documentDownload")
        setDocData(data)

        // api call and reset
        // form.reset();
    };

    type FieldName = keyof DocumentFormValues;

    const next = async () => {
        const fields = steps[currentStep].fields;

        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true
        });

        if (!output) { console.log('error'); return; }

        if (currentStep < steps.length - 1) {

            setPreviousStep(currentStep);
            setCurrentStep((step) => step + 1);
        }

        if (currentStep === steps.length - 1) {
            console.log('test')
            await form.handleSubmit(processForm)();
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep);
            setCurrentStep((step) => step - 1);
        }
    };

    return (
        <>
            <div className='flex flex-col h-full overflow-y-scroll'>
                <div className='flex flex-col flex-1 h-full '>
                    <div className="flex items-center justify-between mb-[10px]">
                        <Heading title={headerTitle} description={headerDescription} />
                        {initialData && (
                            <Button
                                disabled={loading}
                                // variant="destructive"
                                // size="sm"
                                onClick={() => setOpen(true)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <Separator />
                    <div className='mt-[10px] mb-[20px]'>
                        <ul className="flex gap-4">
                            {steps.map((step, index) => (
                                <li key={step.name} className="md:flex-1">
                                    {currentStep > index ? (
                                        <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                            <span className="text-sm font-medium text-sky-600 transition-colors ">
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-medium">{step.name}</span>
                                        </div>
                                    ) : currentStep === index ? (
                                        <div
                                            className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                                            aria-current="step"
                                        >
                                            <span className="text-sm font-medium text-sky-600">
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-medium">{step.name}</span>
                                        </div>
                                    ) : (
                                        <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                            <span className="text-sm font-medium text-gray-500 transition-colors">
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-medium">{step.name}</span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Separator />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(processForm)}
                            className={cn("w-full space-y-8 mt-[20px]")}
                        >
                            <div
                                className='w-full md:inline-block'
                            >
                                {
                                    currentStep === 0 && (
                                        <DocumentFormStep1 form={form} />
                                    )
                                }
                                {
                                    currentStep == 1 && (
                                        <DocumentFormStep2 form={form} />
                                    )
                                }
                                {
                                    currentStep === 2 && (
                                        <DocumentFormStep3 form={form} />
                                    )
                                }
                                {
                                    currentStep === 3 && (
                                        <DocumentFormStep4 form={form} />
                                    )
                                }
                                {
                                    currentStep === 4 && (
                                        <DocumentFormStep5 form={form} />
                                    )
                                }
                            </div>
                        </form>
                    </Form>
                    {/* Navigation */}
                    <div className='pt-[100px] mt-auto justify-end'>
                        <div className="flex justify-between ">
                            <button
                                type="button"
                                onClick={prev}
                                disabled={currentStep === 0}
                                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                className={`rounded ${currentStep === 4 ? " bg-blue-500 text-white hover:bg-blue-300" : "bg-white  text-sky-900 hover:bg-sky-50"}  px-2 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset ring-sky-300  disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                {currentStep === 4 ?
                                    <div>Submit</div>
                                    :
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
