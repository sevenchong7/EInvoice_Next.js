import Image from "next/image"


export const PaymentButton = ({ id, payment, src, name, onClick, }: { id: string, payment: string, src: any, name: string, onClick: () => void }) => {
    return (
        <>
            <button className={`w-full border rounded-lg shadow-lg ${payment == id && "ring-2 ring-blue-800"}`} onClick={onClick}>
                <div className='pl-[20px] flex py-1'>
                    <Image src={src} alt={name} height={80} width={80} className='pr-[20px]' priority={true} />
                    <div className='flex flex-col item-center justify-center'>
                        <h1 className='text-2xl font-semibold'>{name}</h1>
                    </div>
                </div>
            </button>
        </>
    )
}