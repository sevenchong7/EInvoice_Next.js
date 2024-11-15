import DocumentContent from '@/components/contentPage/document_content';
import { getCountry } from '@/lib/services/generalService';

export default function page() {
    const getCountryData = getCountry()

    return (
        <DocumentContent getCountryData={getCountryData} />
    )
}