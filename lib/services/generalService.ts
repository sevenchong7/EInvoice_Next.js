import { auth } from '@/auth';
import { get, post } from '@/lib/api';


export const getLanguage = async () => {
    const headers = await getHeaders();

    const response = await get("/v1/language", headers);

    return response;
}

const getHeaders = async () => {
    const session = await auth();
    console.log("session ", session)

    const headers = {
        'Authorization': session?.user?.accessToken ? "Bearer " + session?.user?.accessToken : "",
        'X-MerchantID': session?.user?.merchantId ?? ""
    }

    return headers;
}