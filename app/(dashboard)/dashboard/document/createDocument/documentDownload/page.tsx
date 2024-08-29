'use client';

import DocumentDownload from "@/components/forms/document-form/document-form-download";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import html2pdf from 'jspdf-html2canvas';
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function page() {
    const router = useRouter();
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
        <div className="flex flex-col flex-1 h-full space-y-1 p-5 overscroll-y-auto">
            <div className="flex justify-end w-full pb-[20px] ">
                <Button
                    variant={'outline'}
                    onClick={() => { HandleDownload() }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
                </Button>
            </div>
            <div className="border border-black">
                <div ref={docDownloadRef} >
                    <DocumentDownload />
                </div>
            </div>

        </div>
    )
}