import { auth } from "@/auth";


const API_BASE_URL = process.env.BACKEND_API_URL;
// const API_BASE_URL = "http://52.187.55.33:8082/api";
// const API_BASE_URL = "http://localhost:3001";
const secretkey = process.env.BACKEND_API_SECRETKEY || "";
var CryptoJS = require("crypto-js");



// Define your encryption function using AES with your encryption key
export function encryptAES(data: any, key: string) {
    // Convert key from string to byte array
    var keyBytes = CryptoJS.enc.Utf8.parse(key);

    // Encrypt data using AES
    var encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    // Convert encrypted data to a format suitable for transmission (e.g., base64)
    return encrypted.toString();
}

export function decryptAES(data: any, key: string) {

    // Convert key from string to byte array
    var keyBytes = CryptoJS.enc.Utf8.parse(key);
    try {
        // Decode the hex encoded response
        const encryptedBytes = CryptoJS.enc.Hex.parse(data);

        // console.info("[decryptAES] encryptedBytes", encryptedBytes)
        // Decrypt the response
        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: encryptedBytes },
            keyBytes,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        // console.info("[decryptAES] decrypted", decrypted)

        // Convert decrypted data to UTF-8
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        // console.info("[decryptAES] decryptedText", decryptedText)

        return decryptedText;

    } catch (error) {
        console.error("Decryption error: ", error);
        return {
            error: "Decryption error"
        }
    }
}

// Helper for GET requests (no body required)
export async function get(url: string, headers?: {}) {

    console.log("[API] headers =", headers)

    console.log("[API GET] ", API_BASE_URL + url)
    const response = await fetch(API_BASE_URL + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            ...headers,
        },
    });

    console.log("status ", response.status)
    if (!response.ok) {
        console.error(`[API Error] ${url} ${response.status}`);
        // throw new Error(`Error: ${response.status}`);
        return
    }

    const encryptredResponse = await response.json();

    const rawResponse = decryptAES(encryptredResponse, secretkey);
    // console.log("rawResponse ", rawResponse)
    console.log("[API response] " + url, JSON.parse(rawResponse));

    return JSON.parse(rawResponse);
}

// Helper for POST requests (with body)
export async function post(url: string, body: any, headers?: {}) {
    // console.log("access_token ", access_token)
    console.log("headers ", headers)


    console.log(`[API POST] ${API_BASE_URL + url} ${JSON.stringify(body)}`)

    const encryptedBody = encryptAES(JSON.stringify(body), secretkey)

    const response = await fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: encryptedBody,
    });


    const encryptredResponse = await response.json();

    const rawResponse = decryptAES(encryptredResponse, secretkey);
    console.log("[API response] " + url, JSON.parse(rawResponse));

    if (!response.ok) {
        // throw new Error(`Error: ${response.status}`);
        return JSON.parse(rawResponse);
    }

    return JSON.parse(rawResponse);
}



// Helper for PUT requests (with body)
export async function put(url: string, body: any, headers?: {}) {
    // console.log("access_token ", access_token)
    console.log("put headers ", headers)


    console.log(`[API PUT] ${API_BASE_URL + url} ${JSON.stringify(body)}`)

    const encryptedBody = encryptAES(JSON.stringify(body), secretkey)

    const response = await fetch(API_BASE_URL + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: encryptedBody,
    });


    const encryptredResponse = await response.json();

    const rawResponse = decryptAES(encryptredResponse, secretkey);
    console.log("[API response] " + url, JSON.parse(rawResponse));

    if (!response.ok) {
        // throw new Error(`Error: ${response.status}`);
        return JSON.parse(rawResponse);
    }

    return JSON.parse(rawResponse);
}









// Helper for POST requests (with body)
export async function upload(url: string, body: any, headers?: {}) {
    // console.log("access_token ", access_token)
    console.log("headers ", headers)
    console.log("body ", body)


    console.log(`[API POST] ${API_BASE_URL + url} ${JSON.stringify(body)}`)

    // const encryptedBody = encryptAES(JSON.stringify(body), secretkey)

    const response = await fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            // "Content-Type": "multipart/form-data",
            ...headers,
        },
        body: body,
    });


    const uploadResponse = await response.json();

    // const rawResponse = decryptAES(encryptredResponse, secretkey);
    // console.log("[API response] " + url, JSON.parse(rawResponse));

    if (!response.ok) {
        // throw new Error(`Error: ${response.status}`);
        return JSON.parse(uploadResponse);
    }

    return JSON.parse(uploadResponse);
}