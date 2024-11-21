import DocumentContent from '@/components/contentPage/document_content';
import { getCountry } from '@/lib/services/generalService';

export default async function page() {
    const getCountryData = await getCountry()

    return (
        <DocumentContent getCountryData={getCountryData} />
    )
}