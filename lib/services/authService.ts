import { get, post } from '@/lib/api';


export const login = async (body: any) => {
    const response = await post("/v1/user/login", body);

    return response;
}