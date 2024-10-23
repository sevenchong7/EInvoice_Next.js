'use client'
import BreadCrumb from '@/components/breadcrumb';
import UpdatePassword from '@/components/forms/user-updatePassword';
import { useTranslations } from 'next-intl';

export default function UpdatePasswordContent() {
    const t = useTranslations()
    const breadcrumbItems = [{ title: t('TAG_UPDATE_PASSWORD'), link: '/updatePassword' }];

    return (
        <div className="flex-1 h-full space-y-4 p-4 pt-6 md:p-8">
            <BreadCrumb items={breadcrumbItems} />
            <UpdatePassword />
        </div>
    );
}
