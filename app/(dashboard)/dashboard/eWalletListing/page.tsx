import EwalletContent from "@/components/contentPage/eWalletList_content";
import { getEWalletList } from "@/lib/services/userService";

export default async function page() {
    const eWalletListData = await getEWalletList();
    return <EwalletContent data={eWalletListData} />
}