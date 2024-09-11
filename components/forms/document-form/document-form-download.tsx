'use client';
import { useStore } from "@/action/action"
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf";
import html2pdf from 'jspdf-html2canvas';
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { ScrollArea } from "@/components/ui/scroll-area";
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

export default function DocumentDownload() {
    let docDownloadRef = useRef(null!);

    const HandleDownload = async () => {
        try {
            const inputData = docDownloadRef.current;
            const canvas = await html2canvas(inputData);

            var opt = {
                margin: 1,
                filename: "output.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "px", format: "a4", orientation: "portrait" }
            };

            html2pdf(
                inputData,
                {
                    // margin: 3,
                    // image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: "px", format: "a4", orientation: "portrait" },
                    imageType: 'image/jpeg',
                    output: 'e-invoice.pdf'
                },
            );

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ScrollArea className="h-full">
            <div className="flex flex-col flex-1 h-full space-y-1 p-5 overscroll-y-auto">
                <div className="flex justify-end w-full pb-[20px] ">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="min-w-fit overscroll-y-auto">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-5 overscroll-y-auto">
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
                                        PDF
                                    </div>
                                    <div className="border border-black">
                                        <DocumentInfo />
                                    </div>
                                    <SheetFooter className="justify-end">
                                        <Button onClick={() => HandleDownload()} className="bg-blue-800 hover:bg-blue-700">Confirm</Button>
                                    </SheetFooter>
                                </div>
                            </ScrollArea>
                        </SheetContent>

                    </Sheet>

                </div>
                <div className="border border-black">
                    <div ref={docDownloadRef} >
                        <DocumentInfo />
                    </div>
                </div>

            </div>
        </ScrollArea>
    )
}

const DocumentInfo = () => {
    const { data } = useStore()
    return (
        <div className="flex flex-col w-full">
            <div className="w-full p-[10px]">
                {
                    data.buyerAddress.map((value, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <p className="text-center text-sm">{value.buyerLine}</p>
                        </div>
                    ))
                }
                <p className="text-center text-sm">{data.buyerZipCode + " " + data.buyerState}</p>
                <p className="text-center text-sm">Tel: {data.buyerContact}</p>
                <p className="text-center text-sm">Email {data.buyerEmail}</p>
                <div className="flex grid grid-cols-2 border-b-2 text-sm">
                    {
                        data.supplierPartyInformation.map((value, index) => (
                            <div key={index} className="grid grid-rows-none auto-rows-min">
                                <p> Tin No. : {value.supplierSchemeId}</p>
                            </div>
                        ))
                    }
                    <p className="text-right">e-invoice</p>

                    <p>Registration No.: {data.supplierIndustryClassCode}</p>
                    <p className="text-right">Document Code:</p>

                    <p>SST ID: </p>
                    <p className="text-right">Invoice Date and Time</p>

                    <p>MSIC Code</p>

                </div>

                <div className="pt-[30px] grid grid-cols-2 text-sm">
                    <div>
                        <p>Buyer TIN No.:</p>
                        <p>Buyer Name :</p>
                        <div className="flex flex-row space-x-1">
                            Buyer Address :
                            {data.buyerAddress.map((value, index) => (
                                <div key={index} className="flex flex-row ">
                                    <p>{value.buyerLine} </p>
                                </div>
                            ))}
                            {data.buyerZipCode}
                            {data.buyerState}
                            {data.buyerCountry}
                        </div>
                        <p >Buyer Contact Number : </p>
                        <p>Buyer Email : </p>

                    </div>
                    <div className="text-right text-sm">
                        <p>Payment Method : </p>
                        <p>Invoice Currency Code: </p>
                    </div>
                </div>

                <div className="pt-[20px] ">
                    <div className="grid grid-cols-9 items-center text-center text-sm rounded-lg bg-gray-300 p-[10px] text-sm">
                        <p>Classification</p>
                        <p>Descript</p>
                        <p>Quantity</p>
                        <p>Unit Price</p>
                        <p>Amount</p>
                        <p>Charge</p>
                        <p>Disc</p>
                        <p>Tax Amount</p>
                        <p>Total</p>
                    </div>
                    {
                        data.items.map((value, index) => (
                            <div key={index} className="grid grid-cols-9 items-center text-center text-sm p-[10px] border-b border-black text-sm">
                                <p>{value.classificationCode}</p>
                                <p>{value.description}</p>
                                <p>{value.quantity}</p>
                                <p>{value.itemPrice}</p>
                                <p>{value.subTotal}</p>
                                <p>{value.totalCharge}</p>
                                <p>{value.totalDiscount}</p>
                                <p>{value.taxableAmount}</p>
                                <p>{value.totalTaxAmount}</p>
                            </div>
                        ))
                    }

                </div>

                <div className="pt-[30px]">
                    <div className="grid grid-cols-2">
                        <div></div>
                        <div className="grid grid-rows-none auto-rows-min">
                            <div className="grid grid-cols-2">
                                <div className="grid grid-rows-none auto-rows-min text-sm">
                                    <p>Sub Total</p>
                                    <p>Total Excluding Tax</p>
                                    <p>Total Tax Amount</p>
                                    <p>Total Including Tax</p>
                                    <p>Prepaid</p>
                                    <p>Grand Total</p>
                                </div>
                                <div className="grid grid-rows-none auto-rows-min text-right text-sm">
                                    <p>test</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 pt-[20px]">
                    <div className="grid grid-rows-none auto-rows-min text-sm">
                        <p>Digital Signature : </p>
                        <p>Date and Time of Validation : </p>
                        <p>This documentation is visual presentation of e-invoice</p>
                    </div>
                    <div className="grid grid-rows-none auto-rows-min justify-end">
                        <div className="h-[100px] w-[100px] bg-black"></div>
                    </div>
                </div>

            </div >
        </div >
    )
}