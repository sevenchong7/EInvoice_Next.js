import { UseFormReturn } from "react-hook-form"

export const Summary = ({ form, packageData, subscriptionDurationListData }: { form: UseFormReturn<any>, packageData: any, subscriptionDurationListData: any }) => {

    const formpackage = form.getValues('package')
    const subDuration = form.getValues('subscribeDuration')

    return (
        <>
            {/* packageList */}
            <div className='border rounded-lg w-full shadow-xl'>
                <div className='p-[20px]'>
                    <div className=' flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>Summary</h1>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>{packageData.packageList.map((res: any) => (formpackage == res.PackageIdentifier && res.PackageName))} Package</h2>
                            <p className='text-gray-400'>{subscriptionDurationListData?.map((res: any) => (res.subscriptionPeriodCode === subDuration && res.subscriptionPeriodMsgTag))}</p>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageData.packageList.map((res: any) => (formpackage == res.PackageIdentifier && res.pricingList[subDuration!]))} </h1>
                        </div>
                    </div>

                    {/* <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div> */}

                    {/* <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Sub Total</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM 100</h1>
                        </div>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>SST 6%</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM 100</h1>
                        </div>
                    </div> */}

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Total</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageData.packageList.map((res: any) => (formpackage == res.PackageIdentifier && res.pricingList[subDuration!]))}</h1>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}