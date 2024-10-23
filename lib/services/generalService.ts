'use server';
import { auth } from '@/auth';
import { get, post } from '@/lib/api';
import CheckTokenExpiry from './checkTokenExpiry';


export const getLanguage = async () => {
    const headers = await getHeaders();
    const response = await get("/language", headers);

    return response.data;
}

export const getCountry = async () => {
    const response = await get("/v1/country");

    return response.data;
}

export const postRegenerateToken = async (body: any) => {
    const headers = await getHeaders();
    const response = await post('/v1/user/token', body, headers)

    console.log('postRegenerateToken =', response)

    return response.data
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