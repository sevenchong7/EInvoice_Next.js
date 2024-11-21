import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetCountryParam, GetPaymentMethodParam, GetSubscriptionDurationParam } from '../interface/generalInterface';
import { DocumentFormValues } from "@/lib/form-schema";
import { toDate } from "date-fns";

interface Company {
    companyName: string
    regNo: string
    email: string
    businessTinNo: string
}

export function getCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

export type State = {
    packageId: number,
    packageSubStatus: boolean,
    language: string,
    docData: DocumentFormValues,
    company: Company,
    merchantFilterData: { key: string; value: string }[],
    userFilterData: { key: string; value: string }[],
    roleFilterData: { key: string; value: string }[],
    subFilterData: { key: string; value: string }[],
    eWalletFilterData: { key: string; value: string }[],
};

export type Actions = {
    setPackage: (packageId: number) => void;
    setPackageSubStatus: (packageSubStatus: boolean) => void;
    setLocal: (language: string) => void;
    setCompany: (company: Company) => void;
    setDocData: (docData: DocumentFormValues) => void;
    updateSubscription: (sub: string | undefined) => void;
    setMerchantFilterData: (key: string, value: string) => void;
    removeMerchantFilterData: () => void;
    setUserFilterData: (key: string, value: string) => void;
    removeUserFilterData: () => void;
    setRoleFilterData: (key: string, value: string) => void;
    removeRoleFilterData: () => void;
    setSubFilterData: (key: string, value: string) => void;
    removeSubFilterData: () => void;
    setEwalletFilterData: (key: string, value: string) => void;
    removeEwalletFilterData: () => void;
};

export const useDataTaskStore = create<State & Actions>()(
    persist(
        (set) => ({
            packageId: 0,
            packageSubStatus: false,
            language: 'en',

            docData: {
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
            merchantFilterData: [{
                key: '',
                value: ''
            }],
            userFilterData: [{
                key: '',
                value: ''
            }],
            roleFilterData: [{
                key: '',
                value: ''
            }],
            subFilterData: [{
                key: '',
                value: ''
            }],
            eWalletFilterData: [{
                key: '',
                value: ''
            }],
            setPackage: (newPackageId: number) => set({ packageId: newPackageId }),
            setPackageSubStatus: (newPackageSubStatus: boolean) => set({ packageSubStatus: newPackageSubStatus }),
            setLocal: (newLanguage: string) => set({ language: newLanguage }),
            setDocData: (newDocData: DocumentFormValues) => set(() => ({ docData: newDocData })),
            setCompany: (newCompanyData: Company) => set(() => ({ company: newCompanyData })),
            updateSubscription: (sub: string | undefined) => set((state) => ({ company: { ...state.company, subscription: sub } })),
            setMerchantFilterData: (key: string, value: string) =>
                set((state) => {
                    const existingIndex = state.merchantFilterData.findIndex((filter) => filter.key === key);

                    if (existingIndex !== -1) {
                        // Update existing key-value pair
                        const updatedFilters = [...state.merchantFilterData];
                        updatedFilters[existingIndex].value = value;
                        return { merchantFilterData: updatedFilters };
                    } else {
                        // Add new key-value pair
                        return { merchantFilterData: [...state.merchantFilterData, { key, value }] };
                    }
                }),
            removeMerchantFilterData: () => set({ merchantFilterData: [] }),
            setUserFilterData: (key: string, value: string) =>
                set((state) => {
                    const existingIndex = state.userFilterData.findIndex((filter) => filter.key === key);

                    if (existingIndex !== -1) {
                        // Update existing key-value pair
                        const updatedFilters = [...state.userFilterData];
                        updatedFilters[existingIndex].value = value;
                        return { userFilterData: updatedFilters };
                    } else {
                        // Add new key-value pair
                        return { userFilterData: [...state.userFilterData, { key, value }] };
                    }
                }),
            removeUserFilterData: () => set({ userFilterData: [] }),
            setRoleFilterData: (key: string, value: string) =>
                set((state) => {
                    const existingIndex = state.roleFilterData.findIndex((filter) => filter.key === key);

                    if (existingIndex !== -1) {
                        // Update existing key-value pair
                        const updatedFilters = [...state.roleFilterData];
                        updatedFilters[existingIndex].value = value;
                        return { roleFilterData: updatedFilters };
                    } else {
                        // Add new key-value pair
                        return { roleFilterData: [...state.roleFilterData, { key, value }] };
                    }
                }),
            removeRoleFilterData: () => set({ roleFilterData: [] }),
            setSubFilterData: (key: string, value: string) =>
                set((state) => {
                    const existingIndex = state.subFilterData.findIndex((filter) => filter.key === key);

                    if (existingIndex !== -1) {
                        // Update existing key-value pair
                        const updatedFilters = [...state.subFilterData];
                        updatedFilters[existingIndex].value = value;
                        return { subFilterData: updatedFilters };
                    } else {
                        // Add new key-value pair
                        return { subFilterData: [...state.subFilterData, { key, value }] };
                    }
                }),
            removeSubFilterData: () => set({ subFilterData: [] }),
            setEwalletFilterData: (key: string, value: string) =>
                set((state) => {
                    const existingIndex = state.eWalletFilterData.findIndex((filter) => filter.key === key);

                    if (existingIndex !== -1) {
                        // Update existing key-value pair
                        const updatedFilters = [...state.eWalletFilterData];
                        updatedFilters[existingIndex].value = value;
                        return { eWalletFilterData: updatedFilters };
                    } else {
                        // Add new key-value pair
                        return { eWalletFilterData: [...state.eWalletFilterData, { key, value }] };
                    }
                }),
            removeEwalletFilterData: () => set({ eWalletFilterData: [] }),
        }),
        { name: 'data-task-store' }
        // skipHydration: true 
    )
);