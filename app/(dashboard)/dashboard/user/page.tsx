import BreadCrumb from '@/components/breadcrumb';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function page() {
  const t = useTranslations()
  const breadcrumbItems = [{ title: t('TAG_USER'), link: '/dashboard/user' }];

  return (
    <>
      <div className="flex-1  space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
