import approve from '@/public/Approval.png'
import Image from 'next/image'

export default function RegisterUserStep5Admin() {
    return (
        <>
            <div className="flex flex-col h-full items-center justify-center mx-auto">
                <Image src={approve} alt='approve' />
                <h1>You are now registered</h1>
                <p className="text-gray-400 text-sm"> Thank you! You have successfully register an account</p>
            </div>
        </>
    )
}