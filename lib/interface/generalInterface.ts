export interface GetCountryParam {
    countryName: string
    countryCode: string
    contactPrefix: string
    stateList?: StateListParam[]
}

export interface StateListParam {
    stateName: string
    stateCode: string
}

export interface GetPaymentMethodParam {
    content: PaymentMethodContentParam[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export interface PaymentMethodContentParam {
    id: number
    paymentMethodDisplayName: string
    paymentMethodClassName: string
    imagePath: string
    status: string
}

export interface GetSubscriptionDurationParam {
    subscriptionPeriodCode: string
    subscriptionPeriodMsgTag: string
    durationInMonths: number
}