'use server';
import { auth } from '@/auth';
import { get, post, put } from '@/lib/api';

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

    return response.data;
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
    const response = await get('/v1/role/subscriptions');

    return response.data;
}

export const getRoleValidation = async (body: any, id: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/validation/${body}/${id}`, headers);

    return response;
}

export const getLoginIdValidation = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/user/validate/${body}`, headers);

    return response;
}

export const getDefaultPermission = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/all/permission/${body}`, headers);

    return response.data;
}


const getHeaders = async () => {
    const session = await auth();
    const headers = {
        'Authorization': session?.user?.accessToken ? "Bearer " + session?.user?.accessToken : "",
        'X-MerchantID': session?.user?.merchantId ?? "", 'X-Accept-Language': session?.user.xAcceptLanguage ?? 'en'
    }

    return headers;
}