import { Company } from "@/constants/data";
import { DocumentFormValues } from "@/lib/form-schema";
import { create } from "zustand";

interface docState {
    data: DocumentFormValues,
    company: Company,
    setCompany: (data: Company) => void
    setDocData: (data: DocumentFormValues) => void
    updateSubscription: (sub: string | undefined) => void
}

export const useStore = create<docState>()((set) => ({
    data: {
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
    },
    company: {
        companyName: '',
        regNo: '',
        email: '',
        businessTinNo: '',
        address: undefined,
        apt_suite_building: undefined,
        zipCode: undefined,
        state: undefined,
        town_city: undefined,
        country: undefined,
        contactNo: undefined,
        subscription: undefined,
    },
    setDocData: (newData: DocumentFormValues) => set(() => ({ data: newData })),
    setCompany: (newData: Company) => set(() => ({ company: newData })),
    updateSubscription: (sub: string | undefined) => set((state) => ({ company: { ...state.company, subscription: sub } }))
}))
