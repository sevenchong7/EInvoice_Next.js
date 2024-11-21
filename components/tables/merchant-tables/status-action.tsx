import CustomSwitch from "@/components/customSwitch";
import { CustomeModal } from "@/components/modal/custome-modal";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirmButton";
import { Merchant, MerchantContent, User } from "@/constants/data";
import { GetMerchantListContentParam } from "@/lib/interface/userInterface";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface StatusActionProps {
    data: GetMerchantListContentParam;
}

export default function StatusAction({ data }: StatusActionProps) {
    const [openModal, setOpenModal] = useState(false)
    const [textVisible, setTextVisible] = useState(true);
    const t = useTranslations()

    const HandleStatus = () => {
        setOpenModal(false)
        setTextVisible(false);

        setTimeout(() => {
            setTextVisible(true);
        }, 300);

    }

    return (
        <>
            <CustomeModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                loading={false}
                title={`${t('TAG_CHANGE_STATUS')}?`}
                titleClassName={'text-2xl font-medium items-center'}
                content={
                    <>
                        <div>
                            <div className=" flex justify-center items-center text-center">
                                {t('TAGE_CHANGE_STATUS_DESC')}
                            </div>
                            <div className="flex w-full justify-between items-center pt-10">
                                <Button onClick={() => setOpenModal(false)} className="bg-gray-400 hover:bg-gray-300">{t('TAG_CANCEL')}</Button>
                                <ConfirmButton onClick={() => HandleStatus()} className="bg-blue-800 hover:bg-blue-600">{t('TAG_CONFIRM')}</ConfirmButton>
                            </div>
                        </div>
                    </>
                }
            />
            <div>

            </div>
            {
                data.status == 'Pending Verification' ?
                    <p className="text-orange-500 text-center text-nowrap text-xs">{data.status}</p> :
                    <CustomSwitch data={data.status} checkActive={"ACTIVE"} onclick={() => { setOpenModal(true) }} />
                // <Button
                //     onClick={() => setOpenModal(true)}
                //     className={cn(
                //         "relative flex items-center transition-all duration-300 m-auto min-w-[110px]",
                //         data.status === "ACTIVE" ? "bg-green-600 hover:bg-green-500 justify-start" : "justify-end text-right  bg-zinc-400 hover:bg-gray-500 ",
                //         "rounded-full"
                //     )}
                // >
                //     <div
                //         className={cn(
                //             "absolute rounded-full bg-white w-6 h-6 transition-all duration-300 ",
                //             data.status === "ACTIVE" ? "translate-x-16 ease-linear" : "-translate-x-16 ease-linear"
                //         )}
                //     />
                //     <p
                //         className={cn(
                //             textVisible ? "opacity-100 " : "opacity-0", 'text-white'
                //         )}
                //     >
                //         {data.status}
                //     </p>
                // </Button>
            }

        </>
    )
}