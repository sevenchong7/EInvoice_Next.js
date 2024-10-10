import React from "react";

export default function RegisterUserStepper(
    { steps, currentStep }: { steps: any, currentStep: number }
) {
    return (
        <>
            <div className="relative bg-black hidden h-full flex-col text-white lg:flex dark:border-r  col-span-2 items-center justify-center">
                {steps.map((step: any, index: any) => (
                    <div key={index}>
                        {currentStep > index ?
                            <div className='flex flex-row'>
                                <div className='flex flex-col pr-[21px] min-w-[170px]'>
                                    <div className='flex flex-row justify-end text-2xl'>
                                        {step.id}
                                    </div>
                                    <p className='flex flex-row justify-end text-sm'>
                                        {step.name}
                                    </p>

                                </div>
                                {index < 4 ?
                                    <div className='flex flex-col items-center justify-center '>
                                        <div className='rounded-full bg-white h-[50px] w-[50px]' />
                                        <div className='h-[100px] w-[3px] bg-white' />
                                    </div>
                                    :
                                    <div className=' rounded-full bg-white h-[50px] w-[50px] ' />
                                }

                            </div> :
                            currentStep === index ?
                                <div className='flex flex-row'>
                                    <div className='flex flex-col pr-[21px] min-w-[170px]'>
                                        <div className='flex flex-row justify-end text-2xl'>
                                            {step.id}
                                        </div>
                                        <p className='flex flex-row justify-end text-sm'>
                                            {step.name}
                                        </p>

                                    </div>
                                    {index < 4 ?
                                        <div className='flex flex-col items-center justify-center '>
                                            <div className='rounded-full bg-white h-[50px] w-[50px]' />
                                            <div className='h-[100px] w-[3px] bg-white' />
                                        </div>
                                        :
                                        <div className='rounded-full bg-white h-[50px] w-[50px]' />
                                    }

                                </div> :
                                <div className='flex flex-row'>
                                    <div className='flex flex-col pr-[21px] col-span-2 min-w-[170px]'>
                                        <div className='flex flex-row justify-end text-2xl'>
                                            {step.id}
                                        </div>
                                        <p className='flex flex-row justify-end text-sm'>
                                            {step.name}
                                        </p>

                                    </div>
                                    {index < 4 ?
                                        <div className='flex flex-col items-center justify-center '>
                                            <div className=' rounded-full bg-gray-500 h-[50px] w-[50px]' />
                                            <div className='h-[100px] w-[3px] bg-gray-500 ' />
                                        </div>
                                        :
                                        <div className=' rounded-full bg-gray-500 h-[50px] w-[50px]' />
                                    }

                                </div>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}