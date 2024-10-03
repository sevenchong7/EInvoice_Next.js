import { Company } from "@/constants/data";
import { DocumentFormValues } from "@/lib/form-schema";
import { toDate } from "date-fns";
import { create } from "zustand";

interface docState {
    data: DocumentFormValues,
    company: Company,
    setCompany: (data: Company) => void
    setDocData: (data: DocumentFormValues) => void
    updateSubscription: (sub: string | undefined) => void
}

export function getCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

export const useStore = create<docState>()((set) => ({

    data: {
        invoiceId: "",
        issuesDateTime: '',
        invoiceType: "",

        invoiceDocRef: "",
        additionalInvoiceDocRef: "",

        currencyCode: "",
        exchangeRate: '',

        totalTaxAmount: 0,
        totalNetAmount: 0,

        invoiceDiscountValue: 0,
        invoiceDiscountDescriotion: '',
        invoiceFeeChargeValue: 0,
        invoiceFeeChargeDescription: '',

        totalExcludingTax: 0,
        totalIncludingTax: 0,
        totalRoundingAmount: 0,
        totalPayableAmount: 0,

        items: [
            {
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

                rate: [
                    {
                        rateType: '',
                        taxType: '',
                        taxPercentage: 0,
                        noOfUnit: 0,
                        rateUnit: 0,
                        totalTaxPerType: 0,

                    }
                ],

                taxTypeNotApplicable: '',
                taxNotApplicable: 0,
                totalTaxPerTypeNotApplicable: 0,

                taxTypeExempted: '',
                amountExempted: 0,
                amountOfTaxExempted: 0,
                detailOfTaxExemption: '',

                subTotal: 0,
                totalDiscount: 0,
                totalCharge: 0,
                totalTaxAmount: 0,
            }
        ],

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
        supplierEmail: '',

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
    },
    company: {
        companyName: "",
        regNo: "",
        email: "",
        businessTinNo: ""
    },
    setDocData: (newData: DocumentFormValues) => set(() => ({ data: newData })),
    setCompany: (newData: Company) => set(() => ({ company: newData })),
    updateSubscription: (sub: string | undefined) => set((state) => ({ company: { ...state.company, subscription: sub } }))
}))
