
'use server';
import { get, getNoHeader, post } from '@/lib/api';

export const getCountry = async () => {
    const response = await get("/v1/country");

    return response.data;
}

export const postRegenerateToken = async (body: any) => {
    const response = await post('/v1/user/token', body)

    return response.data
}

export const getpaymentMethod = async () => {
    const response = await getNoHeader('/v1/payment-methods');

    console.log('getpaymentMethod = ', response.data)

    return response.data;
}

export const getSubscriptionDuration = async () => {
    const response = await get('/v1/subscriptions');

    return response.data;
}


// const getHeaders = async () => {
//     const session = await auth(); // Your authentication function
//     console.log('[getHeaders] session =', session)

//     if (!session) {
//         redirect("/")
//     }

//     const checkToken = await CheckTokenExpiry(session);

//     if (!checkToken) {
//         redirect("/")
//     }
//     const headers = {
//         'Authorization': session.user.accessToken ? "Bearer " + session.user.accessToken : "",
//         'X-MerchantID': session.user.merchantId ?? "",
//         'X-Accept-Language': session.user.xAcceptLanguage ?? 'en',
//     };
//     return headers
// }