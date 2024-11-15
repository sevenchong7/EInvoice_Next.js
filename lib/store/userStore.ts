import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetEwalletBalanceListParam, GetLanguageListParam, GetMerchantInfoListParam, GetMerchantListParam, GetMerchantUserInfoListParam, GetMultiPaymentListParam, GetPackageInfoListParam, GetPaymentListParam, GetPaymentMethodTypeListParam, GetRegisterPackageListParam, GetRoleInfoListParam, GetRoleListParam, GetRoleSelectionListParam, GetRoleSelectionPermissionListParam, GetSubscriptionListParam, GetSwitchRoleListParam, GetUserListParam } from '../interface/userInterface';

export type State = {
    roleList: GetRoleListParam,
    roleInfoList: GetRoleInfoListParam,
    roleSelectionList: GetRoleSelectionListParam[],
    roleSelectionPermissionList: GetRoleSelectionPermissionListParam,
    userList: GetUserListParam,
    merchantUserInfoList: GetMerchantUserInfoListParam,
    merchantList: GetMerchantListParam,
    merchantInfoList: GetMerchantInfoListParam,
    subscriptionList: GetSubscriptionListParam,
    registerPackageList: GetRegisterPackageListParam,
    // roleValidationList :GetRoleValidationListParam,
    // loginIdValidationList:GetLoginIdValidationListParam,
    // defaultPermissionList:GetDefaultPermissionListParam,
    switchRoleList: GetSwitchRoleListParam[],
    // validateEmailList:GetValidateEmailListParam,
    getLanguageList: GetLanguageListParam[],
    // verifyLoginIdList: GetVerifyLoginIdListParam,
    paymentList: GetPaymentListParam[],
    multiPaymentList: GetMultiPaymentListParam,
    eWalletBalanceList: GetEwalletBalanceListParam,
    packageInfoList: GetPackageInfoListParam,
    paymentMethodType: GetPaymentMethodTypeListParam[],

};

//action
export type Actions = {
    setRoleList: (roleList: GetRoleListParam) => void;
    setRoleInfoList: (roleInfoList: GetRoleInfoListParam) => void;
    setRoleSelectionList: (roleSelectionList: GetRoleSelectionListParam[]) => void;
    setRoleSelectionPermissionList: (roleSelectionPermissionList: GetRoleSelectionPermissionListParam) => void;
    setUserList: (usetList: GetUserListParam) => void;
    setMerchantUserInfoList: (merchantUserInfoList: GetMerchantUserInfoListParam) => void;
    setMerchantList: (merchantList: GetMerchantListParam) => void;
    setMerchantInfoList: (merchantInfoList: GetMerchantInfoListParam) => void;
    setSubscriptionList: (subscriptionList: GetSubscriptionListParam) => void;
    setRegisterPackageList: (registerPackageList: GetRegisterPackageListParam) => void;
    // setRoleValidationList: (roleValidationList:GetRoleValidationListParam) => void;
    // setLoginIdValidationList: (loginIdValidationList:GetLoginIdValidationListParam) => void;
    // setDefaultPermissionList: (defaultPermissionList:GetDefaultPermissionListParam) => void;
    setSwitchRoleList: (switchRoleList: GetSwitchRoleListParam[]) => void;
    // setValidateEmailList: (validateEmailList:GetValidateEmailListParam) =>void;
    setGetLanguageList: (getLanguageList: GetLanguageListParam[]) => void;
    // setVerifyLoginIdList: (verifyLoginIdList:GetVerifyLoginIdListParam) => void;
    setPaymentList: (paymentList: GetPaymentListParam[]) => void;
    setMultiPaymentList: (multiPaymentList: GetMultiPaymentListParam) => void;
    setEWalletBalanceList: (eWalletBalanceList: GetEwalletBalanceListParam) => void;
    setPackageInfoList: (packageInfoList: GetPackageInfoListParam) => void;
    setPaymentMethodType: (paymentMethodType: GetPaymentMethodTypeListParam[]) => void;


};

export const useUserTaskStore = create<State & Actions>()(
    persist(
        (set) => ({
            //initial data value
            roleList: {
                content: [],
                page: 0,
                size: 0,
                totalElements: 0,
                totalPages: 0
            },
            roleInfoList: {
                mupId: 0,
                currentPackageId: 0,
                roleQuantity: 0,
                merchantUserList: {
                    content: [{
                        muId: 0,
                        username: '',
                        role: '',
                        status: '',
                        merchantName: ''
                    }]
                },
                permissionList: []
            },
            roleSelectionList: [],
            roleSelectionPermissionList: {
                status: false,
                data: {
                    mupId: 0,
                    currentPackageId: 0,
                    roleQuantity: 0,
                    permissionList: []
                },
                error: undefined
            },
            userList: {
                content: [],
                page: 0,
                size: 0,
                totalElements: 0,
                totalPages: 0
            },
            merchantUserInfoList: {
                muId: 0,
                loginId: '',
                role: '',
                status: '',
                permissionList: []
            },
            merchantList: {
                content: [],
                page: 0,
                size: 0,
                totalElements: 0,
                totalPages: 0
            },
            merchantInfoList: {
                merchantId: 0,
                companyName: '',
                registrationNo: '',
                businessTinNo: '',
                sstRegNo: '',
                tourRegNo: '',
                joinDate: '',
                email: ''
            },
            subscriptionList: {
                mupId: 0,
                currentPackageId: 0,
                packageList: [],
                roleQuantity: 0
            },
            registerPackageList: {
                mupId: 0,
                currentPackageId: 0,
                packageList: [],
                roleQuantity: 0
            },
            switchRoleList: [],
            paymentList: [],
            multiPaymentList: {
                status: false,
                data: {
                    merchantId: 0,
                    multiPaymentFlag: false
                },
                error: undefined
            },
            eWalletBalanceList: {
                ewalletBalance: 0
            },
            packageInfoList: {
                merchantId: 0,
                multiPaymentFlag: false,
                summeryList: [],
                currentSubscriptionPeriod: '',
                currentSubscriptionPeriodCode: ''
            },
            paymentMethodType: [],
            getLanguageList: [],

            //reducer
            setRoleList: (newRoleList: GetRoleListParam) => set({ roleList: newRoleList }),
            setRoleInfoList: (newRoleInfoList: GetRoleInfoListParam) => set({ roleInfoList: newRoleInfoList }),
            setRoleSelectionList: (newRoleSelectionList: GetRoleSelectionListParam[]) => set({ roleSelectionList: newRoleSelectionList }),
            setRoleSelectionPermissionList: (newRoleSelectionPermissionList: GetRoleSelectionPermissionListParam) => set({ roleSelectionPermissionList: newRoleSelectionPermissionList }),
            setUserList: (newUserList: GetUserListParam) => set({ userList: newUserList }),
            setMerchantUserInfoList: (newMerchantUserInfoList: GetMerchantUserInfoListParam) => set({ merchantUserInfoList: newMerchantUserInfoList }),
            setMerchantList: (newMerchantList: GetMerchantListParam) => set({ merchantList: newMerchantList }),
            setMerchantInfoList: (newMerchantInfoList: GetMerchantInfoListParam) => set({ merchantInfoList: newMerchantInfoList }),
            setSubscriptionList: (newSubscriptionList: GetSubscriptionListParam) => set({ subscriptionList: newSubscriptionList }),
            setRegisterPackageList: (newRegisterPackageList: GetRegisterPackageListParam) => set({ registerPackageList: newRegisterPackageList }),
            // setRoleValidationList: (newRoleValidationList: GetRoleValidationListParam) => set({roleValidationList: newRoleValidationList}),
            // setLoginIdValidationList: (newLoginIdValidationList: GetLoginIdValidationListParam) => set({loginIdValidationList: newLoginIdValidationList}),
            // setDefaultPermissionList: (newDefaultPermissionList: GetDefaultPermissionListParam) => set({defaultPermissionList: newDefaultPermissionList}),
            setSwitchRoleList: (newSwitchRoleList: GetSwitchRoleListParam[]) => set({ switchRoleList: newSwitchRoleList }),
            // setValidateEmailList: (newValidateEmailList: GetValidateEmailListParam) => set({validateEmailList: newValidateEmailList}),
            setGetLanguageList: (newGetLanguageList: GetLanguageListParam[]) => set({ getLanguageList: newGetLanguageList }),
            // setVerifyLoginIdList: (newVerifyLoginIdList: GetVerifyLoginIdListParam) => set({verifyLoginIdList: newVerifyLoginIdList}),
            setPaymentList: (newPaymentList: GetPaymentListParam[]) => set({ paymentList: newPaymentList }),
            setMultiPaymentList: (newMultiPaymentList: GetMultiPaymentListParam) => set({ multiPaymentList: newMultiPaymentList }),
            setEWalletBalanceList: (newEWalletBalanceList: GetEwalletBalanceListParam) => set({ eWalletBalanceList: newEWalletBalanceList }),
            setPackageInfoList: (newPackageInfoList: GetPackageInfoListParam) => set({ packageInfoList: newPackageInfoList }),
            setPaymentMethodType: (newPaymentMethodType: GetPaymentMethodTypeListParam[]) => set({ paymentMethodType: newPaymentMethodType }),

        }),
        { name: 'user-task-store', skipHydration: true }
    )
);