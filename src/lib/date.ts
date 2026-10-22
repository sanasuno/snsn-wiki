/**
 * @lib/date.ts
 * 日付関連のユーティリティ関数
 */
import { defaultLocale } from '@i18n/i18n.config';
import { t, type Locale } from '@lib/i18n';

export function formatDate(date: Date, locale: Locale = defaultLocale): string {
    return date.toLocaleDateString(t('lang.locale', locale), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}