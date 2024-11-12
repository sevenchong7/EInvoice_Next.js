'use server';
import { auth, signOut } from '@/auth';
import { get, post, put, upload } from '@/lib/api';
import { redirect } from 'next/navigation';

export const getRoles = async () => {
    const headers = await getHeaders();
    const response = await get("/v1/role", headers);

    return response.data;
}

export const getRoleInfo = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/${body}`, headers);

    return response.data;
}

export const editRole = async (body: any) => {
    const headers = await getHeaders();
    const response = await put('/v1/role', body, headers);

    return response
}

export const addRole = async (body: any) => {
    const headers = await getHeaders();
    const response = await post('/v1/role', body, headers);

    return response;
}

export const register = async (body: any) => {
    const response = await post("/v1/user/register", body);

    console.log('response data = ', response.data)

    return response;
}

export const forgetPassword = async (body: any) => {
    const response = await post("/v1/user/forget-password", body);

    return response.data;
}

export const updatePassword = async (body: any) => {
    const headers = await getHeaders();
    const response = await put("/v1/user/password", body, headers);

    return response;
}

export const roleSelectionList = async () => {
    const headers = await getHeaders();
    const response = await get('/v1/role/selection', headers);

    return response.data;
}

export const roleSelectionPermission = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/selection/permission/${body}`, headers);

    return response;
}

export const mechantUserInviteNewUser = async (body: any) => {
    const headers = await getHeaders();
    const response = await post('/v1/user/user-list', body, headers);

    return response;
}

export const getUserList = async () => {
    const headers = await getHeaders();
    const response = await get('/v1/user/user-list', headers);

    return response.data;
}

export const merchantUserUpdateStatus = async (id: any, body: any) => {
    const headers = await getHeaders();
    const response = await put(`/v1/user/user-list/status/${id}`, body, headers);

    return response;
}

export const getMerchantUserInfo = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/user/user-list/${body}`, headers);

    return response.data;
}

export const merchantUserInfoUpdate = async (id: any, body: any) => {
    const headers = await getHeaders();
    const response = await put(`/v1/user/user-list/${id}`, body, headers);

    return response.data;
}

export const getMerchantList = async () => {
    const headers = await getHeaders();
    const response = await get("/v1/merchant/list", headers);

    return response.data;
}

export const getMerchantInfo = async () => {
    const headers = await getHeaders();
    const response = await get('/v1/merchant/info', headers);

    return response.data;
}

export const editMerchantInfo = async (id: any, body: any) => {
    const headers = await getHeaders();
    const response = await put(`/v1/merchant/info/${id}`, body, headers);

    return response;
}

export const getSubscription = async () => {
    const headers = await getHeaders();
    const response = await get('/v1/role/subscriptions', headers);

    return response.data;
}

export const getRegisterPackage = async () => {
    const response = await get('/v1/role/reg/subscriptions');

    console.log('getRegisterPackage = ', response.data)

    return response.data;
}

export const getRoleValidation = async (body: any, id: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/validation/${body}/${id}`, headers);

    return response;
}

export const getLoginIdValidation = async (body: any) => {
    // const headers = await getHeaders();
    const response = await get(`/v1/user/validate/${body}`);

    return response;
}

export const getDefaultPermission = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/all/permission/${body}`, headers);

    return response.data;
}
export const updatePackage = async (body: any) => {
    const headers = await getHeaders();
    const response = await put('/v1/role/package', body, headers);

    return response;
}

export const getSwitchRoleList = async () => {
    const headers = await getHeaders();
    const response = await get("/v1/user/switch-list", headers);

    return response.data
}

export const getSwitchRole = async () => {
    const headers = await getHeaders();
    const response = await get("/v1/user/switch", headers);

    return response.data;
}

export const getValidateEmail = async (body: any) => {
    // const headers = await getHeaders();
    const response = await get(`/v1/merchant/validate/${body}`)

    return response;
}

export const postUploadAdmin = async (body: any) => {
    const headers = await getHeaders();
    const response = await upload('/v1/upload/admin', body, headers);

    console.log('postUploadAdmin body = ', body)
    return response;
}

export const getLanguage = async () => {
    const headers = await getHeaders();
    const response = await get("/language", headers);

    return response.data;
}

export const putPackageUpdate = async (body: any) => {
    const headers = await getHeaders();
    const response = await put('/v1/role/package', body, headers);

    console.log('response', response)

    return response;
}

export const putUnsubscribe = async (body?: any) => {
    const headers = await getHeaders();
    const response = await put('/v1/role/unsubscribe', body, headers);

    return response;
}

export const putPasswordReset = async (id: any, body: any) => {
    const response = await put(`/v1/user/forget-password/${id}`, body);

    return response;
}

export const getVerifyLoginId = async (id: any) => {
    const response = await get(`/v1/user/verify-loginId?${id}`);

    console.log('getVerifyLoginId = ', response)

    return response;
}

export const getPayment = async (id: any) => {
    const response = await get(`/v1/payments/${id}`)

    return response;
}

export const putActiveAccount = async (id: any, body?: any) => {
    const response = await put(`/v1/user/active-account/${id}`, body);

    return response;
}

export const getMultiPayment = async () => {
    const headers = await getHeaders();
    const response = await get('/v1/payments/multiPayment', headers);

    return response;
}

export const getEwalletBalance = async (id: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/ewallet/balance/${id}`, headers);

    return response.data;
}

export const getPackageInfo = async (packageId: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/package/info/${packageId}`, headers);

    return response.data;
}

const getHeaders = async () => {
    const session = await auth();

    if (!session) {
        redirect('/')
    }
    const currentDate = new Date()
    const refreshDate = new Date(session.user.refreshTokenExpiry)

    if (currentDate > refreshDate) {
        redirect('/')
    }

    const headers = {
        'Authorization': session?.user.accessToken ? "Bearer " + session.user.accessToken : "",
        'X-MerchantID': session?.user.merchantId ?? "",
        'X-Accept-Language': session?.user.xAcceptLanguage ?? 'en',
    };

    return headers
}