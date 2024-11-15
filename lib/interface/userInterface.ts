export interface GetRoleListParam {
    content: GetRoleListContentParam[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export interface GetRoleListContentParam {
    mupId: number
    role: string
    currentPackageId: number
    merchantName?: string
    roleQuantity: number
    lastModify: string
}

export interface GetRoleInfoListParam {
    mupId: number
    currentPackageId: number
    roleQuantity: number
    merchantUserList: MerchantUserListParam
    permissionList: PermissionListParam[]
}

export interface MerchantUserListParam {
    content: [
        {
            muId: number
            username: string
            role: string
            status: string
            merchantName: string
        }
    ]
}

export interface PermissionListParam {
    selected: boolean
    Route: string
    Function: PermissionListFunctionParam[]
}

export interface PermissionListFunctionParam {
    selected: boolean
    functionNameTag: string
    FunctionName: string
    value: string
    subFunctions: PermissionListFunctionSubFunctionsParam[]
}

export interface PermissionListFunctionSubFunctionsParam {
    selected: boolean
    functionNameTag: string
    FunctionName: string
    value: string
}

export interface GetRoleSelectionListParam {
    mupId: number
    role: string
    currentPackageId: number
    roleQuantity: number
}

export interface GetRoleSelectionPermissionListParam {
    status: boolean
    data: {
        mupId: number
        currentPackageId: number
        roleQuantity: number
        permissionList: PermissionListParam[]
    }
    error: any
}

export interface GetUserListParam {
    content: GetUserListContentParam[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export interface GetUserListContentParam {
    muId: number
    username: string
    role: string
    status: string
    merchantName?: string
}

export interface GetMerchantUserInfoListParam {
    muId: number
    loginId: string
    role: string
    status: string
    permissionList: PermissionListParam[]
}

export interface GetMerchantListParam {
    content: GetMerchantListContentParam[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export interface GetMerchantListContentParam {
    merchantId: number,
    companyName: string,
    registrationNo: string,
    businessTinNo: string,
    sstRegNo: string,
    tourRegNo: string,
    address?: string,
    city?: string,
    postcode?: string,
    stateId?: string,
    country?: string,
    joinDate?: string,
    contactPrefix?: string,
    contact?: string,
    status?: string,
    email?: string,
    loginId?: string

}

export interface GetMerchantInfoListParam {
    merchantId: number
    companyName: string
    registrationNo: string
    businessTinNo: string
    sstRegNo: string
    tourRegNo: string
    joinDate: string
    email: string
    address?: string
    postcode?: string
    city?: string
    stateId?: string
    country?: string
    contact?: string
    contactPrefix?: string
}

export interface GetSubscriptionListParam {
    mupId: number
    currentPackageId: number
    packageList: PackageListParam[]
    roleQuantity: number
}

export interface GetRegisterPackageListParam {
    mupId: number
    currentPackageId: number
    packageList: PackageListParam[]
    roleQuantity: number
}

export interface PackageListParam {
    pricingList: {
        M3?: number
        M6?: number
        Y1?: number
    }
    PackageName: string
    PackageIdentifier: number
    Descriptions: string[]
    MainMenu: []
}

export interface GetRoleValidationListParam {
    status: boolean
    data: any
    error: any
}

export interface GetLoginIdValidationListParam {
    status: boolean
    data: any
    error: any
}

export interface GetDefaultPermissionListParam {
    mupId: number
    currentPackageId: number
    roleQuantity: number
    permissionList: PermissionListParam[]
}

export interface GetSwitchRoleListParam {
    merchantName: string
    validPath: boolean
    mid: number
}

export interface GetSwitchRoleParam {
    mupId: number
    permission: string[]
    currentPackageId: number
    roleQuantity: number
}

export interface GetValidateEmailListParam {
    status: boolean
    data: any
    error: any
}

export interface GetLanguageListParam {
    languageName: string
    languageFlag: string
}

export interface GetVerifyLoginIdListParam {
    status: boolean
    data: any
    error: any
}

export interface GetPaymentListParam {
    status: boolean
    data: boolean
    error: any
}

export interface GetMultiPaymentListParam {
    status: boolean
    data: {
        merchantId: number
        multiPaymentFlag: boolean
    }
    error: any
}

export interface GetEwalletBalanceListParam {
    ewalletBalance: number
}

export interface GetPackageInfoListParam {
    merchantId: number
    multiPaymentFlag: boolean
    summeryList: SummeryListParam[]
    currentSubscriptionPeriod: string
    currentSubscriptionPeriodCode: string
}

export interface SummeryListParam {
    subscriptionPeriod: string
    subscriptionPeriodCode: string
    currentPackagePrice: number
    remainingAmountFromPreviousPackage: number
    discountPrice: number
    totalPaymentAmount: number
    ewalletAdjustmentAmount: number
}


export interface GetPaymentMethodTypeListParam {
    id: number
    paymentMethodDisplayName: string
    paymentMethodCode: string
}