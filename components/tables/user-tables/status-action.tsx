import { CustomeModal } from "@/components/modal/custome-modal";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirmButton";
import { contents, User } from "@/constants/data";
import { merchantUserUpdateStatus } from "@/lib/services/userService";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface StatusActionProps {
    data: contents;
}

export default function StatusAction({ data }: StatusActionProps) {
    const [openModal, setOpenModal] = useState(false)
    const [textVisible, setTextVisible] = useState(true);
    const t = useTranslations()

    const HandleStatus = () => {
        let status = data.status
        setOpenModal(false)
        setTextVisible(false);

        setTimeout(() => {
            setTextVisible(true);
        }, 300);

        if (data.status === 'Y') {
            status = 'N'
        } else {
            status = 'Y'
        }

        merchantUserUpdateStatus(data.muId, status)
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
                data.status == 'Pending Verification' ? <p className="text-orange-500 text-center text-nowrap text-xs">{data.status}</p> :
                    <div>
                        <Button
                            onClick={() => setOpenModal(true)}
                            className={cn(
                                "relative flex items-center transition-all duration-300 m-auto min-w-[100px]",
                                data.status === "Y" ? "bg-blue-800 hover:bg-blue-700 justify-start" : "justify-end text-right",
                                "rounded-lg"
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute rounded-full bg-white w-5 h-5 transition-all duration-300 dark:bg-gray-400",
                                    data.status === "Y" ? "translate-x-14 ease-linear" : "-translate-x-14 ease-linear"
                                )}
                            />
                            <div
                                className={cn(
                                    textVisible ? "opacity-100 " : "opacity-0", data.status === "Y" && 'dark:text-white'
                                )}
                            >
                                {data.status == 'Y' ? <p>Active</p> : <p>Inactive</p>}
                            </div>
                        </Button>
                    </div>

            }

        </>
    )
}