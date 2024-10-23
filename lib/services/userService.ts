'use server';
import { auth } from '@/auth';
import { get, post, put, upload } from '@/lib/api';
import { postRegenerateToken } from './generalService';
import CheckTokenExpiry from './checkTokenExpiry';

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

const getHeaders = async () => {
    const session = await auth();

    if (session != undefined) {
        CheckTokenExpiry(session)
    }

    const headers = {
        'Authorization': session?.user?.accessToken ? "Bearer " + session?.user?.accessToken : "",
        'X-MerchantID': session?.user?.merchantId ?? "", 'X-Accept-Language': session?.user.xAcceptLanguage ?? 'en'
    }

    return headers;
}