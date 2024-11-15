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
import { PaymentButton } from "../paymentButton";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { useUserTaskStore } from "@/lib/store/userStore";
import { useDataTaskStore } from "@/lib/store/dataStore";


export default function SubscriptionPayment() {
    const session = useSession()
    const router = useRouter();
    const t = useTranslations()
    const { toast } = useToast();
    const [payment, setPayment] = useState<any>('');
    const [ewallet, setEwallet] = useState<any>(null);
    const [error, setError] = useState(false)
    const [ewalletAmount, setEwalletAmount] = useState(0);
    const [ewalletSelected, setEwalletSelected] = useState(false)
    const [ewalletAmountError, setEwalletAmountError] = useState(false)
    const [subPeriod, setSubPeriod] = useState<any>('M3')
    const [summeryPackage, setSummeryPackage] = useState<any>()
    const [packageDurationPriceSummery, setPackageDurationPriceSummery] = useState<any>()
    const [loading, setLoading] = useState(false);
    const [checkPaymentLoading, setCheckPaymentLoading] = useState(false)
    const [subId, setSubId] = useState<any>()
    const setPackageSubStatus = useDataTaskStore((state) => state.setPackageSubStatus)

    const paymentMethod = useGeneralTaskStore((state) => state.paymentMethodList)
    const subPackage = useDataTaskStore((state) => state.packageId)
    const currentPackageInfo = useUserTaskStore((state) => state.packageInfoList)
    const packageInfo = useUserTaskStore((state) => state.packageInfoList.summeryList)
    const multiPayment = useUserTaskStore((state) => state.multiPaymentList.data.multiPaymentFlag)
    const balance = useUserTaskStore((state) => state.eWalletBalanceList.ewalletBalance)
    const packageListData = useUserTaskStore((state) => state.registerPackageList)

    useEffect(() => {
        packageListData.packageList.map((res: any, index: number) => {
            if (subPackage === res.PackageIdentifier) {
                setSummeryPackage(res)
            }
        })
    }, [packageListData])

    const HandlePayment = async () => {
        if (subPackage !== 1) {
            if (payment == '' && packageDurationPriceSummery?.totalPaymentAmount !== 0) {
                setError(true);
                return
            } else {
                if (!multiPayment && ewalletSelected) {
                    if (balance <= ewalletAmount) {
                        setEwalletAmountError(true)
                        return
                    } else if (packageDurationPriceSummery?.totalPaymentAmount !== ewalletAmount) {
                        setEwalletAmountError(true)
                        return
                    }
                    else {
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

        const resPackageUpdate = await putPackageUpdate(packageUpdateParam)
        if (resPackageUpdate.status) {
            if (packageDurationPriceSummery?.totalPaymentAmount !== 0) {
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
                setPackageSubStatus(resPackageUpdate.status)
                router.push('/dashboard/profile/subscription/payment/information')
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

            } else if (Date.now() >= endTime) {
                setLoading(false);
                setCheckPaymentLoading(false)
                router.push('/dashboard/profile/subscription/payment/information')
            }
        };
        const interval = setInterval(checkPaymentStatus, POLL_INTERVAL);
        return () => clearInterval(interval);

    }, [checkPaymentLoading])

    const HandleEwallet = (wallet: any) => {
        setEwalletSelected(true)
        if (multiPayment) {
            setEwallet(wallet)
            if (ewalletSelected) {
                setEwallet('')
                setEwalletSelected(false)
            }

        } else {
            setPayment(wallet)
            setEwallet('')
        }
    }

    const HandleOnlinePayment = (paymentSelected: any) => {
        if (!multiPayment) {
            setEwalletSelected(false)
            setPayment(paymentSelected)
        } else {
            if (payment != paymentSelected) {
                setPayment(paymentSelected)
            } else {
                setPayment('')
            }
        }
    }

    useEffect(() => {
        if (packageInfo != undefined)
            packageInfo.map((res: any) => {
                console.log('res = ', res)
                if (subPeriod === res.selectedSubscriptionPeriodCode) {
                    setPackageDurationPriceSummery(res)
                }
            })
    }, [packageInfo])

    const HandleSubPeriod = (value: any) => {
        setSubPeriod(value)
        packageInfo.map((res: any) => {
            if (value === res.selectedSubscriptionPeriodCode) {
                setPackageDurationPriceSummery(res)
            }
        })

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
                        paymentMethod?.content?.map((res: any, index: number) => {
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
                                                <Input id="balance" disabled={true} value={balance} placeholder={''} type="number" className="col-span-2" />

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
                                    value={res.selectedSubscriptionPeriodCode}
                                >
                                    {res.selectedSubscriptionPeriod}
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                </Tabs>
                <div className="mt-4">
                    <SubscriptionSummery summeryPackage={summeryPackage} packageDurationPriceSummery={packageDurationPriceSummery} currentPackageInfo={currentPackageInfo} />
                </div>
                {
                    packageDurationPriceSummery?.totalPaymentAmount !== 0 &&
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

const SubscriptionSummery = ({ summeryPackage, packageDurationPriceSummery, currentPackageInfo }: { summeryPackage: any, packageDurationPriceSummery: any, currentPackageInfo: any }) => {
    const t = useTranslations()
    return (
        <>
            <div className='border rounded-lg w-full shadow-xl'>
                <div className='p-[20px]'>
                    <div className=' flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>{t('TAG_SUMMARY')}</h1>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 max-[600px]:grid-cols-5 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Selected  {summeryPackage?.PackageName} {t('TAG_PACKAGE')}</h2>
                            <p className='text-gray-400'>{packageDurationPriceSummery?.selectedSubscriptionPeriod}</p>
                        </div>
                        <div className='flex items-center justify-end col-span-1 max-[600px]:col-span-2'>
                            <h1>RM {packageDurationPriceSummery?.currentPackagePrice}</h1>
                        </div>

                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>Remaining Amount from {summeryPackage?.PackageName} {t('TAG_PACKAGE')}</h2>
                            <p className='text-gray-400'>{currentPackageInfo?.currentSubscriptionPeriod}</p>
                        </div>
                        <div className='flex items-center justify-end  col-span-1 max-[600px]:col-span-2'>
                            <h1>RM {packageDurationPriceSummery?.remainingAmountFromPreviousPackage}</h1>
                        </div>
                    </div>

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-4 max-[600px]:grid-cols-5 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>{t('TAG_DISCOUNT')}</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1 max-[600px]:col-span-2'>
                            <h1>RM {packageDurationPriceSummery?.discountPrice}</h1>
                        </div>

                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>{t('TAG_EWALLET')}</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1 max-[600px]:col-span-2'>
                            <h1>RM {packageDurationPriceSummery?.ewalletAdjustmentAmount}</h1>
                        </div>
                        {/* <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>{t('TAG_DISCOUNT')}</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-1'>
                            <h1>RM {packageDurationPriceSummery?.remainingAmountFromPreviousPackage}</h1>
                        </div> */}
                    </div>

                    <div className=' flex flex-col items-center justify-center'>
                        <div className='w-full h-[1px] mt-2 bg-gray-300'></div>
                    </div>

                    <div className='grid grid-cols-5 pt-[10px]'>
                        <div className='col-span-3 flex flex-col '>
                            <h2 className='text-base'>{t('TAG_TOTAL')}</h2>
                        </div>
                        <div className='flex items-center justify-end col-span-2'>
                            <h1>RM {packageDurationPriceSummery?.totalPaymentAmount}</h1>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}