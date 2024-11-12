'use client';

import { Button } from "@/components/ui/button";
import { putActiveAccount } from "@/lib/services/userService";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
    const { id } = useParams()
    const router = useRouter()
    const t = useTranslations()

    useEffect(() => {
        checkActiveAccount()
    }, [])

    const checkActiveAccount = async () => {
        const checkActivate = await putActiveAccount(id)

        if (!checkActivate.status) {
            router.replace('/not-found')
        }
    }
    return (
        // from-green-400 
        <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
            {/* <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent justify-center content-center items-center w-full"> */}
            {/* Success */}
            <div className="flex flex-1 w-full justify-center">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1736" width="200" height="200"><path d="M925.7 337.2c-22.6-53.5-55-101.5-96.2-142.7-41.2-41.2-89.2-73.6-142.7-96.2C631.4 74.9 572.6 63 512 63S392.6 74.9 337.2 98.3c-53.5 22.6-101.5 55-142.7 96.2-41.2 41.2-73.6 89.2-96.2 142.7C74.9 392.6 63 451.4 63 512s11.9 119.4 35.3 174.8c22.6 53.5 55 101.5 96.2 142.7 41.2 41.2 89.2 73.6 142.7 96.2C392.6 949.1 451.4 961 512 961s119.4-11.9 174.8-35.3c53.5-22.6 101.5-55 142.7-96.2s73.6-89.2 96.2-142.7C949.1 631.4 961 572.6 961 512s-11.9-119.4-35.3-174.8z m-199.1 58.7L460.1 662.5l-0.3 0.3c-4.8 4.6-10.9 6.9-17.1 7-6.3-0.1-12.6-2.5-17.4-7.3L297.4 535.2c-4.9-4.9-7.3-11.3-7.3-17.7 0-6.4 2.4-12.8 7.3-17.7 9.8-9.8 25.6-9.8 35.4 0l109.6 109.6 248.8-248.9c9.8-9.8 25.6-9.8 35.4 0 9.7 9.8 9.7 25.6 0 35.4z" fill="#000000" p-id="1737"></path></svg>
            </div>
            {/* </span> */}
            <h2 className="font-heading my-2 text-2xl font-bold">
                Your account has been active .
            </h2>
            <p>
                Close this tab or click the button to back to the Login Page .
            </p>
            <div className="mt-8 flex justify-center gap-2">
                <Button onClick={() => router.replace('/')} variant="default" size="lg">
                    {t("TAG_BACK_TO_HOME")}
                </Button>
            </div>
        </div >
    )
}