'use client';
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf";
import html2pdf from 'jspdf-html2canvas';
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import Head from "next/head";
import { useTranslations } from "next-intl";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmButton } from "@/components/ui/confirmButton";
import { useDataTaskStore } from "@/lib/store/dataStore";

export default function DocumentDownload() {
    const t = useTranslations()
    const { toast } = useToast()
    let docDownloadRef = useRef<HTMLDivElement | null>(null); //reference a component

    const HandleDownload = async () => {
        try {
            const inputData = docDownloadRef.current;
            if (inputData) {
                // Generate the PDF directly using html2pdf
                await html2pdf(inputData,
                    {
                        jsPDF: { orientation: "p", unit: "px", format: "a4" },
                        html2canvas: { scale: 2 },
                        margin: { right: 1, top: 1, bottom: 1, left: 1 },
                        imageType: 'image/jpeg',
                        //change the pdf name here
                        output: 'e-invoice.pdf'
                    }
                )
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Something went wrong when download Please conatact the developer !"

            })
            console.log('Error during PDF download:', error);
        }
    }

    return (
        <>
            <ScrollArea className="lg:h-full sm:h-fit md:w-full w-fit">
                <div className="flex flex-col flex-1 h-full space-y-1 lg:pr-5">
                    <div className="flex lg:justify-end lg:w-full pb-[20px]">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 17V3" />
                                        <path d="m6 11 6 6 6-6" />
                                        <path d="M19 21H5" />
                                    </svg>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className=" lg:min-w-[1170px] min-w-full dark:bg-white dark:text-black">
                                <div className="lg:p-4 space-y-5 flex flex-col">
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M15 12h-5" /><path d="M15 8h-5" /><path d="M19 17V5a2 2 0 0 0-2-2H4" /><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" /></svg>
                                        {t('TAG_PDF')}
                                    </div>

                                    <div className="border border-black  w-max lg:scale-[1.00] md:scale-[0.80] sm:scale-[0.60] sm:origin-top-left max-[600px]:scale-[0.30] max-[600px]:origin-top-left">
                                        <div ref={docDownloadRef} className="w-max">
                                            <DocumentInfo />
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="w-full flex flex-col justify-start">
                                        <ConfirmButton onClick={() => HandleDownload()} className="w-full bg-blue-800 hover:bg-blue-600">
                                            {t('TAG_PDF')}
                                        </ConfirmButton>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="border border-black dark:border-white w-full lg:scale-[1.00] md:scale-[0.80] sm:scale-[0.60] sm:origin-top-left max-[600px]:scale-[0.30] max-[600px]:origin-top-left" >
                        <div className="w-max">
                            <DocumentInfo />
                        </div>
                    </div>
                </div>
                <ScrollBar orientation='vertical' />
                <ScrollBar orientation='horizontal' />
            </ScrollArea>
        </>
    );
}

const DocumentInfo = () => {

    const { docData: data } = useDataTaskStore()
    let totalSalesTax = 0;
    let totalServiceTax = 0;
    let totalTourismTax = 0;
    let totalHighValueTax = 0;
    let totalLowValueTax = 0;
    let totalTaxExemption = 0;
    let value = 0;

    return (
        <>
            {/* <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=2, minimum-scale=0.5, user-scalable=yes"
                />
            </head> */}
            <div className="w-full p-[10px]">
                <div className="flex flex-col w-full items-center w-full">
                    <div className="w-1/3 text-center text-sm">
                        <p>{data.supplierIndustryName}</p>
                        <p>{data.supplierLine + ' , ' + data.supplierCity}</p>
                        <p>{data.supplierZipCode + " " + data.supplierState}</p>
                        <p>Tel: {data.buyerContact}</p>
                        <p>Email: {data.buyerEmail}</p>
                    </div>
                </div>

                <div className="flex flex-col pt-2 space-y-1 pb-[10px] text-sm">
                    <div className="flex justify-between ">
                        <p className="flex">TIN No. : {data.supplierTaxIndentificationNumber}</p>
                        <p className="text-right">e-invoice</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="flex">Business Reg No.: {data.supplierIndustryClassCode}</p>
                        <p className="flex text-right">Document Code: {data.invoiceId}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="flex">SST Reg No.: {data.sstRegNumber}</p>
                        <p className="text-right">UUID: {data.billreferenceNumber}</p>
                    </div>

                    <div className="flex justify-between">
                        <p>Tourism Tax Reg.No.: {data.tourismTaxRegistrationNum}</p>
                        <p className="text-right">Issuance Date: {data.issuesDateTime}</p>
                    </div>

                    <div className="flex justify-between">
                        <p>MSIC Code: {data.supplierIndustryClassCode}</p>
                        <p className="text-right">Submission Date: {data.issuesDateTime}</p>
                    </div>
                </div>
                <Separator className="dark:bg-white" />
                <div className="pt-[10px] grid grid-cols-2 text-sm">
                    <div className="auto-rows-min">
                        <p>Buyer Name: {data.buyerRegisterName}</p>
                        <p>Buyer TIN No.: {data.buyerTaxIdentificationNumber}</p>
                        <div className="flex flex-row space-x-1">
                            ID Type/Number: {data.buyerIdType}/{data.buyerRegistration_Identification_PassportNumber}
                        </div>
                        <p>SST Reg. No: {data.buyerSSTRegisterNumber}</p>
                        <p>Buyer Contaxt Number: {data.buyerContact}</p>
                        <p>Buyer Email: {data.buyerEmail}</p>
                        <p>Buyer Address: {data.buyerLine},{data.buyerZipCode},{data.buyerState},{data.buyerCountry}</p>

                    </div>
                    <div className="text-right text-sm auto-rows-min">
                        <p>Payment Method: {data.paymentType}</p>
                        <p>Invoice Currency Code: {data.currencyCode}</p>
                    </div>
                </div>

                <div className="pt-[20px] ">
                    <div className="flex justify-between items-center text-center text-sm rounded-lg bg-gray-300 dark:bg-gray-600 p-[10px] text-sm">
                        <p className="flex-1">No.</p>
                        <p className="flex-1">Code</p>
                        <p className="flex-1 min-w-[200px]">Description</p>
                        <p className="flex-auto max-w-[80px] min-w-[40px]">Qty</p>
                        <p className="flex-1">Unit Price</p>
                        <p className="flex-1">Subtotal</p>
                        <p className="flex-1">Disc</p>
                        <p className="flex-1">Fee / Charge(B)</p>
                        <p className="flex-1">Total Excl. Tax</p>
                    </div>
                    {
                        data.items.map((value, index) => (
                            <div key={index} className="flex justify-between items-center text-center  text-sm p-[10px] border-b border-black dark:border-white text-sm">
                                <p className="flex-1">{index + 1}</p>
                                <p className="flex-1">{value.itemId}</p>
                                <p className="flex-1 min-w-[200px]">{value.description}</p>
                                <p className="flex-auto max-w-[80px] min-w-[40px]">{value.quantity}</p>
                                <p className="flex-1">{value.itemPrice.toFixed(2)}</p>
                                <p className="flex-1">{value.subTotal?.toFixed(2)}</p>
                                <p className="flex-1">{value.totalDiscount?.toFixed(2)}</p>
                                <p className="flex-1">{value.totalCharge?.toFixed(2)}</p>
                                <p className="flex-1">{value.amountExempted.toFixed(2)}</p>
                            </div>
                        ))
                    }
                </div>


                <div className="py-[20px]">
                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div className="">
                            <h1 className="bg-gray-300 dark:bg-gray-600 p-2 border border-black dark:border-white text-lg font-semibold">Discount (A)</h1>
                            <div className="grid grid-cols-7 gap-4 p-2 bg-gray-300 dark:bg-gray-600  text-center border-x border-b border-black dark:border-white">
                                <p>No.</p>
                                <p>Amount</p>
                                <p className="col-span-2">Discount Rate</p>
                                <p className="col-span-3">Description</p>
                            </div>
                            {data.items.map((item, itemIndex) => {
                                return (
                                    <div key={itemIndex} className="grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white">
                                        <p>{itemIndex + 1}</p>
                                        <p>{item.totalDiscount?.toFixed(2)}</p>
                                        <p className="col-span-2">{item.discountRate.toFixed(2)}%</p>
                                        <p className="col-span-3">{item.discountDescription}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="">
                            <h1 className="bg-gray-300 dark:bg-gray-600  p-2 border border-black dark:border-white text-lg font-semibold">Fee / Charges (B)</h1>
                            <div className="grid grid-cols-7 gap-4 p-2 bg-gray-300 dark:bg-gray-600 text-center border-x border-b border-black dark:border-white">
                                <p>No.</p>
                                <p>Amount</p>
                                <p className="col-span-2">Discount Rate</p>
                                <p className="col-span-3">Description</p>
                            </div>
                            {data.items.map((item, itemIndex) => {
                                return (
                                    <div key={itemIndex} className="grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white">
                                        <p>{itemIndex + 1}</p>
                                        <p>{item.totalCharge?.toFixed(2)}</p>
                                        <p className="col-span-2">{item.chargeRate.toFixed(2)}%</p>
                                        <p className="col-span-3">{item.chargeDescription}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="k">
                            <h1 className="bg-gray-300 dark:bg-gray-600  p-2 border border-black dark:border-white text-lg font-semibold">Total Tax Amount (C)</h1>
                            <div className="grid grid-cols-7 gap-4 p-2 bg-gray-300 dark:bg-gray-600  text-center border-x border-b border-black dark:border-white">
                                <p>No.</p>
                                <p className="col-span-3">Tax Type</p>
                                <p className="col-span-3">Amount</p>
                            </div>
                            {data.items.map((item, itemIndex) => (
                                item.rate?.map((rate, rateIndex) => {
                                    return (
                                        <div key={rateIndex} className="grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white">
                                            <p>{itemIndex + 1}</p>
                                            <p className="col-span-3">{rate.taxType}</p>
                                            <p className="col-span-3">{rate.totalTaxPerType?.toFixed(2)}</p>
                                        </div>
                                    )
                                })
                            ))}
                        </div>

                        <div className="">
                            <h1 className="border border-black dark:border-white bg-gray-300 dark:bg-gray-600 p-2 text-lg font-semibold">Tax Exemption</h1>
                            <div className="grid grid-cols-7 gap-4 p-2 bg-gray-300 dark:bg-gray-600  text-center border-x border-b border-black dark:border-white">
                                <p>No.</p>
                                <p className="col-span-3">Amount Exemption from Tax</p>
                                <p className="col-span-3">Description</p>
                            </div>
                            {data.items.map((item, itemIndex) => {
                                return (
                                    <div key={itemIndex} className="grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white">
                                        <p>{itemIndex + 1}</p>
                                        <p className="col-span-3">{item.amountExempted.toFixed(2)}</p>
                                        <p className="col-span-3">{item.detailOfTaxExemption}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>


                <div className="py-[20px] border-y border-black dark:border-white">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="grid grid-cols-2 gap-8 items-center">
                            <p>Total Tax Amount</p>
                            <div className="border border-black dark:border-white rounded-lg p-2 text-right">
                                {data.totalTaxAmount?.toFixed(2)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 items-center">
                            <p>Total Net Amount</p>
                            <div className="border border-black dark:border-white rounded-lg p-2 text-right">
                                {data.totalNetAmount?.toFixed(2)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 items-center">
                            <p className="xl:text-nowrap">Total Excluding Amount</p>
                            <div className="border border-black dark:border-white rounded-lg p-2 text-right">
                                {data.totalExcludingTax?.toFixed(2)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 items-center">
                            <p >Total Including Amount</p>
                            <div className="border border-black dark:border-white rounded-lg p-2 text-right">
                                {data.totalIncludingTax?.toFixed(2)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 items-center">
                            <p>Prepayment Amount</p>
                            <div className="border border-black dark:border-white rounded-lg p-2 text-right">
                                {data.prepaidAmount?.toFixed(2)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 items-center">
                            <p>Total Payable Amount</p>
                            <div className="border border-black dark:border-white rounded-lg p-2 text-right">
                                {data.totalPayableAmount?.toFixed(2)}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-[20px]">
                    <div className="text-sm">
                        <h1 className="bg-gray-300 dark:bg-gray-600 p-2 border border-black dark:border-white text-lg font-semibold">Total Tax Amount Per Tax Type</h1>
                        <div className=" grid grid-cols-7 gap-4 p-2 bg-gray-300 dark:bg-gray-600 text-center border-x border-b border-black dark:border-white">
                            <p>No.</p>
                            <p className="col-span-3">Tax Type</p>
                            <p className="col-span-3">Description</p>
                        </div>

                        {
                            data.items.map((item) => {
                                item.rate?.map((rate) => {
                                    if (rate.taxType == 'Sales') {
                                        return totalSalesTax += Number(rate.totalTaxPerType)
                                    } else if (rate.taxType == 'Service') {
                                        return totalServiceTax += Number(rate.totalTaxPerType)
                                    } else if (rate.taxType == 'Tourism') {
                                        return totalTourismTax += Number(rate.totalTaxPerType)
                                    } else if (rate.taxType == 'High-Value') {
                                        return totalHighValueTax += Number(rate.totalTaxPerType)
                                    } else if (rate.taxType == 'Low-Value') {
                                        return totalLowValueTax += Number(rate.totalTaxPerType)
                                    }
                                })
                                totalTaxExemption += Number(item.amountOfTaxExempted)
                                return null;
                            })
                        }

                        <div className={totalSalesTax != 0 ? " grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white" : 'hidden'}>
                            <p>{totalSalesTax != 0 && (value += 1)}</p>
                            <p className="col-span-3">Sale Tax</p>
                            <p className="col-span-3">{totalSalesTax.toFixed(2)}</p>
                        </div>

                        <div className={totalServiceTax != 0 ? " grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white" : 'hidden'}>
                            <p >{totalServiceTax != 0 && (value += 1)}</p>
                            <p className='col-span-3'>Service Tax</p>
                            <p className='col-span-3'>{totalServiceTax.toFixed(2)}</p>
                        </div>

                        <div className={totalTourismTax != 0 ? " grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white" : 'hidden'}>
                            <p >{totalTourismTax != 0 && (value += 1)}</p>
                            <p className='col-span-3'>Tourism Tax</p>
                            <p className='col-span-3'>{totalTourismTax.toFixed(2)}</p>
                        </div>

                        <div className={totalHighValueTax != 0 ? " grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white" : 'hidden'}>
                            <p >{totalHighValueTax != 0 && (value += 1)}</p>
                            <p className='col-span-3'>High-Value Tax</p>
                            <p className='col-span-3'>{totalHighValueTax.toFixed(2)}</p>
                        </div>
                        <div className={totalLowValueTax != 0 ? " grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white" : 'hidden'}>
                            <p >{totalLowValueTax != 0 && (value += 1)}</p>
                            <p className='col-span-3'>Low-Value Tax</p>
                            <p className='col-span-3'>{totalLowValueTax.toFixed(2)}</p>
                        </div>

                        <div className={totalTaxExemption != 0 ? " grid grid-cols-7 gap-4 p-2 text-center border-x border-b border-black dark:border-white" : 'hidden'}>
                            <p >{totalTaxExemption != 0 && (value += 1)}</p>
                            <p className='col-span-3'>Tax Exemption</p>
                            <p className='col-span-3'>{totalTaxExemption.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col h-full">
                        <div className="flex-grow">
                            <div className="text-xs">
                                <p>Digital Signature : </p>
                                <p>Date and Time of Validation : {data.issuesDateTime}</p>
                                <p>This documentation is a visual presentation of the e-invoice</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end items-end">
                            <div className="h-[100px] w-[100px] bg-black"></div>
                        </div>
                    </div>

                </div>
            </div >
        </ >
    )
}