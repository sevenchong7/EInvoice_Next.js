'use client'
import Image from "next/image";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import subImage from '@/public/subInfoImg.png';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SubscribeInformation() {
    const router = useRouter();
    return (
        <>
            <div className='flex flex-col h-full overflow-y-scroll space-y-5'>
                <div className='flex flex-col flex-1 h-full '>
                    <div className="flex items-center justify-between mb-[10px]">
                        <Heading title="Subscriptions" description="Manage your access to various packages and services" />
                    </div>
                    <Separator />
                    <div className="flex flex-col h-full my-auto justify-center items-center text-center space-y-5 pt-20">
                        <Image src={subImage} alt="no_subscription_image" width={700} height={700} />
                        <h1 className="text-3xl font-medium">Successfully Subscribed</h1>
                        <p className="text-sm">
                            You have been added to our package list. If you have any questions or need assistance, please visit your profile page. <br />
                            You can also manage your subscription preferences there to ensure you receive the updates you want.
                        </p>
                        <Button onClick={() => router.push('/dashboard')} className="bg-blue-900 hover:bg-blue-700">Back to homepage</Button>
                    </div>
                </div>
            </div>
        </>
    )
}