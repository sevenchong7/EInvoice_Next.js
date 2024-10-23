import CreateMerchant from "@/components/contentPage/createMerchant_content";
import { getRegisterPackage } from "@/lib/services/userService";

export default async function page() {
    const packageData = await getRegisterPackage()
    return (
        <CreateMerchant packageData={packageData} />
    )
}