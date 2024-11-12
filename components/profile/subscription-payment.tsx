'use client';
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import Image from "next/image";
import eghl from '@/public/eGHL.png';
import rm from '@/public/RM.png';
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPayment, putPackageUpdate } from "@/lib/services/userService";
import { ConfirmButton } from "../ui/confirmButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingOverlay from "../loading";
import { useToast } from "../ui/use-toast";
import { useTaskStore } from "@/lib/store";


export default function SubscriptionPayment(
    {
        subPackage,
        paymentMethodData,
        multipaymentData,
        eWalletBalanceData,
        packageInfoData,
        packageListData
    }: {
        subPackage: number | null,
        paymentMethodData: any,
        multipaymentData: any,
        eWalletBalanceData: any,
        packageInfoData: any,
        packageListData: any
    }) {
    const session = useSession()
    const router = useRouter();
    const t = useTranslations()
    const { toast } = useToast();
    const [payment, setPayment] = useState<any>();
    const [multiPayment, setMultiPayment] = useState<any>()
    const [ewallet, setEwallet] = useState<any>(null);
    const [error, setError] = useState(false)
    const [balance, setBalance] = useState(0);
    const [ewalletAmount, setEwalletAmount] = useState(0);
    const [ewalletSelected, setEwalletSelected] = useState(false)
    const [ewalletAmountError, setEwalletAmountError] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<any>()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>()
    const [packageInfo, setPackageInfo] = useState<any>()
    const [subPeriod, setSubPeriod] = useState<any>('M3')
    const [summeryPackage, setSummeryPackage] = useState<any>()
    const [packageDurationPriceSummery, setPackageDurationPriceSummery] = useState<any>()
    const [loading, setLoading] = useState(false);
    const [checkPaymentLoading, setCheckPaymentLoading] = useState(false)
    const [subId, setSubId] = useState<any>()
    const setPackageSubStatus = useTaskStore((state) => state.setPackageSubStatus)

    useEffect(() => {
        setPaymentMethod(paymentMethodData.content)
        setMultiPayment(multipaymentData?.data?.multiPaymentFlag)
        setBalance(eWalletBalanceData.ewalletBalance)
        if (packageInfoData != undefined) {
            setPackageInfo(packageInfoData.summeryList)
        }
        packageListData.packageList.map((res: any, index: number) => {
            if (subPackage === res.PackageIdentifier) {
                setSummeryPackage(res)
            }
        })
        console.log('packageInfoData = ', packageInfoData)
        console.log('multipaymentData = ', multipaymentData)
        console.log('eWalletBalanceData = ', eWalletBalanceData)
        console.log('packageListData = ', packageListData)

    }, [paymentMethodData, multipaymentData, eWalletBalanceData, packageInfoData, packageListData])

    const HandlePackageSelect = (selection: number) => {
        setSelectedPaymentMethod(selection)
        // form.setValue("package", selection)
    }

    const HandlePayment = async () => {
        if (subPackage !== 1) {
            if (payment == '') {
                setError(true);
                return
            } else {
                if (!multiPayment && ewalletSelected) {
                    if (balance <= ewalletAmount) {
                        setEwalletAmountError(true)
                        return
                    } else {
                        setEwalletAmountError(false)
                    }
                }
                setError(false);
            }
        }
        const packageUpdateParam = {
            "packageId": subPackage,
            "subscriptionPeriod": subPeriod,
            "paymentMethods": multiPayment ? [
                payment != null ? payment : undefined,
                ewalletSelected ? ewallet : undefined,
            ].filter(item => item !== undefined)
                : [payment],
            "ewalletAmount": ewalletAmount
        }
        console.log('packageUpdateParam = ', packageUpdateParam)
        const resPackageUpdate = await putPackageUpdate(packageUpdateParam)
        console.log('resPackageUpdate = ', resPackageUpdate)
        if (resPackageUpdate.status) {
            const lastIndex = resPackageUpdate.data[resPackageUpdate.data.length - 1]
            setLoading(true);
            const paymentGatewayResponse = lastIndex.urlOrFormHtmlResult;
            const resSubId = lastIndex.subscriptionId
            if (paymentGatewayResponse) {
                const url = paymentGatewayResponse;
                window.open(url, '_blank');
                setSubId(resSubId)
                setCheckPaymentLoading(true)
            }
        } else {
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Something went wrong!"
            })
        }
    }

    useEffect(() => {
        if (!loading && !checkPaymentLoading) return;
        const POLL_INTERVAL = 3000;
        const MAX_DURATION = 180000;
        const endTime = Date.now() + MAX_DURATION;
        const checkPaymentStatus = async () => {
            const res = await getPayment(subId);
            setPackageSubStatus(res.status)
            if (res.status) {
                setLoading(false);
                setCheckPaymentLoading(false)
                router.push('/dashboard/profile/subscription/payment/information')
                // setCurrentStep((prevStep) => prevStep + 1);

            } else if (Date.now() >= endTime) {
                setLoading(false);
                setCheckPaymentLoading(false)
                router.push('/dashboard/profile/subscription/payment/information')
                // setCurrentStep((prevStep) => prevStep + 1);
            }
        };
        const interval = setInterval(checkPaymentStatus, POLL_INTERVAL);
        return () => clearInterval(interval);

    }, [checkPaymentLoading])

    const HandleEwallet = (wallet: any) => {
        setEwalletSelected(true)
        if (multiPayment) {
            setEwallet(wallet)
        } else {
            setPayment(wallet)
            setEwallet('')
        }
    }

    const HandleOnlinePayment = (payment: any) => {
        setEwalletSelected(false)
        setPayment(payment)
    }

    useEffect(() => {
        console.log('period = ', subPeriod)
        if (packageInfo != undefined)
            packageInfo.map((res: any) => {
                console.log('subPeriod === res.subscriptionPeriodCode ', subPeriod === res.subscriptionPeriodCode)
                if (subPeriod === res.subscriptionPeriodCode) {
                    setPackageDurationPriceSummery(res)
                }
            })
    }, [packageInfo])

    const HandleSubPeriod = (value: any) => {
        setSubPeriod(value)
        packageInfo.map((res: any) => {
            if (value === res.subscriptionPeriodCode) {
                setPackageDurationPriceSummery(res)
            }
        })

        console.log('packageInfo = ', packageInfo)
        // packageInfo.summeryList.map((res: any) => {
        //     if (value === res.subscriptionPeriodCode) {
        //         console.log('summeryList = ', res)
        //         setPackageDurationPriceSummery(res)
        //     }
        // })
    }

    const PaymentMethod = () => {
        return (
            <>
                <div className='pt-[30px] space-y-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-semibold'>{t('TAG_PAYMENT_METHOD')}:</h1>
                    </div>
                    {
                        paymentMethod?.map((res: any, index: number) => {
                            return (
                                <div key={index}>
                                    {
                                        res.paymentMethodDisplayName != 'E-WALLET' ?
                                            <PaymentButton id={res.id} payment={payment} src={res.imagePath} name={res.paymentMethodDisplayName} onClick={() => HandleOnlinePayment(res.id)} />
                                            :
                                            <PaymentButton id={res.id} payment={multiPayment ? ewallet : payment} src={res.imagePath} name={res.paymentMethodDisplayName} onClick={() => { HandleEwallet(res.id) }} />
                                    }
                                    {
                                        res.paymentMethodDisplayName == 'E-WALLET' && ewalletSelected && <div className="flex space-x-10 pt-4">
                                            <div className="flex-1">
                                                <p>Balance : </p>
                                                <Input id="balance" disabled={true} value={balance} placeholder={''} type="number" onChange={(e) => setBalance(Number(e.target.value))} className="col-span-2" />

                                            </div>
                                            <div className="flex-1">
                                                <p>Pay Amount:</p>
                                                <Input id="payamount" value={ewalletAmount} placeholder={''} type="number" onChange={(e) => setEwalletAmount(Number(e.target.value))} className="col-span-2" />
                                                {ewalletAmountError && <h1 className="flex justify-center items-center text-red-500">The amount must same with the total amount !</h1>}
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                    {error && <div><h1 className="flex justify-center items-center text-red-500">Please Select a Payment method</h1></div>}
                </div>
            </>
        )
    }

    return (

        <div className='flex flex-col h-full overflow-y-scroll space-y-5'>
            {loading && <LoadingOverlay />}
            <div className='flex flex-col  '>
                <div className="flex items-center justify-between mb-[10px]">
                    <Heading title={t('TAG_SUBSCRIPTIONS')} description={t('TAG_SUBSCRIPTIONS_DESC')} />
                </div>
                <Separator />
            </div>
            <div className="p-1">
                <Tabs defaultValue={subPeriod} onValueChange={(value) => HandleSubPeriod(value)}>
                    <TabsList className="min-w-full">
                        {
                            packageInfo?.map((res: any, index: number) => (
                                <TabsTrigger
                                    className="flex-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                                    key={index}
                                    value={res.subscriptionPeriodCode}
                                >
                                    {res.subscriptionPeriod}
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                </Tabs>
                <div className="mt-4">
                    <SubscriptionSummery summeryPackage={summeryPackage} packageDurationPriceSummery={packageDurationPriceSummery} />
                </div>
                {
                    subPackage !== 1 &&
                    <PaymentMethod />
                }
            </div>
            <div className="flex flex-col h-full justify-end md:pb-4 pb-10">
                <div className="flex flex-row  justify-between items-center">
                    <Button onClick={() => router.back()} className="">{t('TAG_BACK')}</Button>
                    <ConfirmButton onClick={() => HandlePayment()} className="">
                        {subPackage === 1 ? t('TAG_CONFIRM') : t('TAG_CONTINUE_TO_PAYMENT')}
                    </ConfirmButton>
                </div>
            </div>
        </div>
    )
}

const PaymentButton = ({ id, payment, src, name, onClick }: { id: string, payment: string, src: any, name: string, onClick: () => void }) => {
    return (
        <button className={`w-full border rounded-lg shadow-lg ${payment == id && "ring-2 ring-blue-800"}`} onClick={onClick}>
            <div className='pl-[20px] flex py-1'>
                <Image src={src} alt={`${src}`} height={80} width={80} className='pr-[20px]' />
                <div className='flex flex-col item-center justify-center'>
                    <h1 className='text-2xl font-semibold'>{name}</h1>
                </div>
            </div>
        </button>
    )
}


const SubscriptionSummery = ({ summeryPackage, packageDurationPriceSummery }: { summeryPackage: any, packageDurationPriceSummery: any }) => {
    const t = useTranslations()
    return (
        <>
            <div className='border rounded-lg w-full shadow-xl'>
                <div className='p-[20px]'>
                    <div className=' flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>{t('TAG_SUMMARY')}</h1>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>{summeryPackage?.PackageName} Package</h2>
                            <p className='text-gray-400'>{packageDurationPriceSummery?.subscriptionPeriod}</p>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageDurationPriceSummery?.currentPackagePrice}</h1>
                        </div>
                    </div>

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        {/* <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Sub Total</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM 100</h1>
                        </div> */}
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Discount</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageDurationPriceSummery?.remainingAmountFromPreviousPackage}</h1>
                        </div>
                    </div>

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Total</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageDurationPriceSummery?.totalPaymentAmount}</h1>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}