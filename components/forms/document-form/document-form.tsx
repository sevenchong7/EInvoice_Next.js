'use client';
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
import { useStore } from '@/action/action';
import { useTranslations } from 'next-intl';
import React from 'react';
import { getCountry } from '@/lib/services/generalService';


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
    const t = useTranslations()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const headerTitle = t('TAG_CREATE_DOCUMENT')
    const headerDescription = t('TAG_DOCUMENT_DESC');
    // const toastMessage = initialData ? 'Product updated.' : 'Product created.';
    // const action = initialData ? 'Save changes' : 'Create';
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({});
    const delta = currentStep - previousStep;

    const { setDocData } = useStore()

    const defaultValues = {
        invoiceId: "",
        issuesDateTime: undefined,
        invoiceType: "",

        invoiceDocRef: "",
        additionalInvoiceDocRef: "",

        currencyCode: "",
        exchangeRate: '',

        totalTaxAmount: 0,
        totalNetAmount: 0,

        // items: [],

        // items: [
        //     {
        //         itemId: '',
        //         classificationCode: '',
        //         description: '',

        //         itemPrice: 0,
        //         quantity: 0,

        //         discountRate: 0,
        //         discountAmount: 0,
        //         discountDescription: '',

        //         chargeRate: 0,
        //         chargeAmount: 0,
        //         chargeDescription: '',

        //         taxableAmount: 0,
        //         netTaxableAmount: 0,

        //         rate: [{
        //             rateType: ''
        //         }],

        //         // taxSubtotal: [
        //         //     {
        //         //         taxType: '',
        //         //         taxPercentage: 0,
        //         //         noOfUnit: 0,
        //         //         rateUnit: 0,
        //         //         totalTaxPerType: 0,
        //         //     }
        //         // ],

        //         taxTypeExempted: '',
        //         amountExempted: 0,
        //         amountOfTaxExempted: 0,
        //         detailOfTaxExemption: '',

        //         subTotal: 0,
        //         totalDiscount: 0,
        //         totalCharge: 0,
        //         totalExcludingTaxAmount: 0,
        //         amountExemptedFromTax: 0,
        //         totalTaxAmount: 0,
        //     }
        // ],

        supplierIndustryClassCode: '',
        supplierIndustryName: '',
        supplierTaxIndentificationNumber: '',
        supplierBusinessRegNumber: '',
        sstRegNumber: '',
        tourismTaxRegistrationNum: '',

        supplierLine: '',
        supplierZipCode: '',
        supplierCity: '',
        supplierState: '',
        supplierCountry: '',

        supplierContact: '',
        supplierEmail: 'a@gmail.com',

        buyerRegisterName: '',
        buyerSSTRegisterNumber: '',

        buyerIdType: '',

        buyerRegistration_Identification_PassportNumber: '',
        buyerTaxIdentificationNumber: '',

        buyerLine: '',

        buyerZipCode: '',
        buyerCity: '',
        buyerState: '',
        buyerCountry: '',
        buyerContact: '',
        buyerEmail: '',

        deliveryName: '',
        deliveryIdType: '',
        deliceryRegistration_Identification_PassportNumber: '',
        deliveryShippingRecipientTin: '',

        deliveryLine: '',
        deliveryZipCode: '',
        deliveryCity: '',
        deliveryState: '',
        deliveryCountry: '',

        deliveryReferenceNumber: '',
        deliveryRefNumIncoterm: '',
        deliveryFreeTradeAgreement: '',
        deliveryAuth_No_for_Cert_Export: '',
        deliveryAuth_No_Incoterm: '',
        deliveryDetailofOtherCharges: '',
        deliveryDetailofOtherChargesDescirption: '',

        invoicePeriodStartDate: undefined,
        invoicePeriodEndDate: undefined,
        invoicePeriodFrequencyofBilling: '',

        paymentType: '',
        supplierbankAccountNumber: '',
        paymentTerm: '',
        prepaidAmount: 0,
        issuedDateTime: undefined,
        prepaymentReferenceNumber: '',
        billreferenceNumber: '',
        totalPayableAmount: 0,
    }

    const form = useForm<DocumentFormValues>({
        resolver: zodResolver(documentFormSchema),
        defaultValues,
        mode: 'onBlur'
    });

    const {
        control,
        formState: { errors }
    } = form;


    const {
        fields: fieldsItems,
    } = useFieldArray({
        control,
        name: 'items'
    })


    const steps = [
        {
            id: t('TAG_STEP1'),
            name: t('TAG_INVOICE_INFORMATION'),
            fields: [
                "invoiceId",
                "issuesDateTime",
                "invoiceType",

                "invoiceDocRef",
                "additionalInvoiceDocRef",

                "currencyCode",
                "exchangeRate",

                "totalTaxAmount",
                "totalNetAmount",

                'items',

                ...fieldsItems?.map((_, index) => {
                    const { fields: fieldsRate } = useFieldArray({
                        control,
                        name: `items.${index}.rate`
                    })

                    return [
                        `items.${index}.itemId`,
                        `items.${index}.classificationCode`,
                        `items.${index}.description`,

                        `items.${index}.itemPrice`,
                        `items.${index}.quantity`,

                        `items.${index}.discountRate`,
                        `items.${index}.discountAmount`,
                        `items.${index}.discountDescription`,

                        `items.${index}.chargeRate`,
                        `items.${index}.chargeAmount`,
                        `items.${index}.chargeDescription`,

                        `items.${index}.taxableAmount`,
                        `items.${index}.taxableAmountAfterExemptionTax`,

                        ...fieldsRate?.map((_, rateIndex) => {
                            return [
                                `items.${index}.rate.${rateIndex}.rateType`,
                                `items.${index}.rate.${rateIndex}.taxType`,
                                `items.${index}.rate.${rateIndex}.taxPercentage`,
                                `items.${index}.rate.${rateIndex}.noOfUnit`,
                                `items.${index}.rate.${rateIndex}.rateUnit`,
                                `items.${index}.rate.${rateIndex}.totalTaxPerType`,
                            ]

                        }).flat(),


                        `items.${index}.taxTypeExempted`,
                        `items.${index}.amountExempted`,
                        `items.${index}.amountOfTaxExempted`,
                        `items.${index}.detailOfTaxExemption`,

                        `items.${index}.subTotal`,
                        `items.${index}.totalDiscount`,
                        `items.${index}.totalCharge`,
                        `items.${index}.totalExcludingTaxAmount`,
                        `items.${index}.amountExemptedFromTax`,
                        `items.${index}.totalTaxAmount`,
                    ]
                }).flat()

            ]
        },
        {
            id: t('TAG_STEP2'),
            name: t('TAG_SUPPLIER_BUYER'),
            fields: [
                'supplierIndustryClassCode',
                'supplierIndustryName',
                'supplierTaxIndentificationNumber',
                'supplierBusinessRegNumber',
                'sstRegNumber',
                'tourismTaxRegistrationNum',

                'supplierLine',
                'supplierZipCode',
                'supplierCity',
                'supplierState',
                'supplierCountry',

                'supplierContact',
                'supplierEmail',

                'buyerRegisterName',
                'buyerSSTRegisterNumber',

                'buyerIdType',

                'buyerRegistration_Identification_PassportNumber',
                'buyerTaxIdentificationNumber',

                'buyerLine',
                'buyerZipCode',
                'buyerCity',
                'buyerState',
                'buyerCountry',
                'buyerContact',
                'buyerEmail',

                'deliveryName',
                'deliveryIdType',
                'deliceryRegistration_Identification_PassportNumber',
                'deliverdeliveryShippingRecipientTinyName',

                'deliveryLine',
                'deliveryZipCode',
                'deliveryCity',
                'deliveryState',
                'deliveryCountry',

                'deliveryReferenceNumber',
                'deliveryRefNumIncoterm',
                'deliveryFreeTradeAgreement',
                'deliveryAuth_No_for_Cert_Export',
                'deliveryAuth_No_Incoterm',
                'deliveryDetailofOtherCharges',
                'deliveryDetailofOtherChargesDescirption',
            ]
        },
        {
            id: t('TAG_STEP3'),
            name: t('TAG_ADDITIONAL_INFORMATION'),
            fields: [
                'invoicePeriodStartDate',
                'invoicePeriodEndDate',
                'invoicePeriodFrequencyofBilling',

                "paymentType",
                "supplierbankAccountNumber",
                "paymentTerm",
                "prepaidAmount",
                "issuedDateTime",
                "prepaymentReferenceNumber",
                "billreferenceNumber",
            ]
        },
        {
            id: t('TAG_STEP4'),
            name: t('TAG_SUMMARY_SUBMIT')
        }
    ];

    const onSubmit = async (data: DocumentFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                // await axios.post(`/ api / products / edit - product / ${ initialData._id }`, data);
            } else {
                // const res = await axios.post(`/ api / products / create - product`, data);
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
        console.log('data ==>', data);
        setData(data);
        setDocData(data)
        router.push("/dashboard/document/createDocument/documentDownload")


        // api call and reset
        // form.reset();
    };

    type FieldName = keyof DocumentFormValues;

    const next = async () => {
        const fields = steps[currentStep].fields;

        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true
        });

        // const itemOutput = await form.trigger('items')
        // if (!itemOutput) return

        if (!output) { return; }



        if (currentStep < steps.length - 1) {

            setPreviousStep(currentStep);
            setCurrentStep((step) => step + 1);
        }

        if (currentStep === steps.length - 1) {
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
                        <ul className="md:flex gap-4">
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
                                {/* {
                                    currentStep === 4 && (
                                    )
                                } */}
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
                                className={`rounded ${currentStep === 3 ? " bg-blue-800 text-white hover:bg-blue-900" : "bg-white  text-sky-900 hover:bg-sky-50 ring-1 ring-inset ring-sky-300"}  px-2 py-1 text-sm font-semibold shadow-sm   disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                {currentStep === 3 ?
                                    <div>{t('TAG_SUBMIT')}</div>
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
