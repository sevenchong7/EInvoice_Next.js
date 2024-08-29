'use client'
import Image from "next/image";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import unSubImage from '@/public/noSubscription.png';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function UnsubscribeInformation() {
    const router = useRouter();
    return (
        <>
            <div className='flex flex-col h-full overflow-y-scroll space-y-5'>
                <div className='flex flex-col flex-1 h-full '>
                    <div className="flex items-center justify-between mb-[10px]">
                        <Heading title="Subscriptions" description="Manage your access to various packages and services" />
                    </div>
                    <Separator />
                    <div className="flex flex-col justify-center items-center text-center space-y-5">
                        <Image src={unSubImage} alt="no_subscription_image" width={500} height={500} />
                        <h1 className="text-3xl font-medium">Successfully Unsubscribed</h1>
                        <p>
                            You have been removed from our package list. <br />
                            If this is a mistake or if you want to receive updates again you can easily<br />
                            subscribe again from your profile page.
                        </p>
                        <Button onClick={() => router.push('/dashboard')} className="bg-blue-900 hover:bg-blue-700">Back to homepage</Button>
                    </div>
                </div>
            </div>
        </>
    )
}