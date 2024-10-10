'use server';
import { auth } from '@/auth';
import { get, post } from '@/lib/api';


export const getLanguage = async () => {
    const headers = await getHeaders();

    const response = await get("/language", headers);

    console.log('getLanguage = ', response)

    return response.data;
}

export const getCountry = async () => {
    // const headers = await getHeaders();

    const response = await get("/v1/country");

    console.log('country = ', response)

    return response.data;
}

const getHeaders = async () => {
    const session = await auth();
    console.log("session ", session)

    const headers = {
        'Authorization': session?.user?.accessToken ? "Bearer " + session?.user?.accessToken : "",
        'X-MerchantID': session?.user?.merchantId ?? "", 'X-Accept-Language': session?.user.xAcceptLanguage ?? 'en'
    }

    return headers;
}