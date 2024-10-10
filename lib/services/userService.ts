'use server';
import { auth } from '@/auth';
import { get, post, put } from '@/lib/api';
import { headers } from 'next/headers';

export const getRoles = async () => {
    const headers = await getHeaders();
    const response = await get("/v1/role", headers);

    return response.data;
}

export const getRoleInfo = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/${body}`, headers);

    console.log('getRoleInfo = ', response)

    return response.data;
}

export const editRole = async (body: any) => {
    const headers = await getHeaders();
    const response = await put('/v1/role', body, headers)

    console.log('edit role info = ', response)

    return response
}

export const register = async (body: any) => {
    const response = await post("/v1/user/register", body);
    console.log(response);
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
    const response = await get('/v1/role/selection', headers)

    console.log("roleSelectionList = ", response)

    return response.data;
}

export const roleSelectionPermission = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/role/selection/permission/${body}`, headers)

    console.log('roleSelectionPermission = ', response)

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

    console.log('getUserList = ', response)

    return response.data;
}

export const merchantUserUpdateStatus = async (id: any, body: any) => {
    const headers = await getHeaders();
    const response = await put(`/v1/user/user-list/status/${id}`, body, headers);

    console.log('merchantUserUpdateStatus = ', response);

    return response
}

export const getMerchantUserInfo = async (body: any) => {
    const headers = await getHeaders();
    const response = await get(`/v1/user/user-list/${body}`, headers)

    console.log('getMerchantUserInfo = ', response)

    return response.data;
}

export const merchantUserInfoUpdate = async (id: any, body: any) => {
    const headers = await getHeaders();
    const response = await put(`/v1/user/user-list/${id}`, body, headers);

    console.log('merchantUserInfoUpdate = ', response);

    return response.data;
}

export const getMerchantList = async () => {
    const headers = await getHeaders();
    const response = await get("/v1/merchant/list", headers)

    console.log("getMerchantList = ", response);

    return response.data;
}

export const getMerchantInfo = async () => {
    const headers = await getHeaders();
    const response = await get('/v1/merchant/info', headers);

    console.log("getmerchantInfo = ", response.data);

    return response.data;
}

export const getSubscription = async () => {
    const headers = await getHeaders();
    const response = await get('/v1/role/subscriptions', headers);

    console.log("getSubscription = ", response);

    return response.data;
}


const getHeaders = async () => {
    const session = await auth();
    // console.log("session ", session)

    const headers = {
        'Authorization': session?.user?.accessToken ? "Bearer " + session?.user?.accessToken : "",
        'X-MerchantID': session?.user?.merchantId ?? "", 'X-Accept-Language': session?.user.xAcceptLanguage ?? 'en'
    }

    console.log('session  = ', session)

    return headers;
}