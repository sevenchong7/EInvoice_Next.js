import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
    const t = useTranslations('TAG_LOCALE_SWITCHER');
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            items={[
                {
                    value: 'en',
                    label: t('TAG_EN')
                },
                {
                    value: 'zh',
                    label: t('TAG_ZH')
                }
            ]}
            label={t('TAG_LABLE')}
        />
    );
}