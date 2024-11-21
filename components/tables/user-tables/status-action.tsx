import CustomSwitch from "@/components/customSwitch";
import { CustomeModal } from "@/components/modal/custome-modal";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirmButton";
import { contents, User } from "@/constants/data";
import { putMerchantUserUpdateStatus } from "@/lib/services/userService";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StatusActionProps {
    data: contents;
}

export default function StatusAction({ data }: StatusActionProps) {
    const [openModal, setOpenModal] = useState(false)
    const [textVisible, setTextVisible] = useState(true);
    const t = useTranslations()
    const router = useRouter()

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

        const statusParam = {
            "status": status
        }

        const merchantStatusUpdate = putMerchantUserUpdateStatus(data.muId, statusParam)

        merchantStatusUpdate.then(() => { router.refresh() })


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
                        <CustomSwitch data={data.status} checkActive={"Y"} onclick={() => { setOpenModal(true) }} activeTitle='Active' inactiveTitle='Inactive' />
                    </div>
            }

        </>
    )
}