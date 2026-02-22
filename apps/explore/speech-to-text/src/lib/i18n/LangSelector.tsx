import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useTranslations, useLocale } from 'use-intl'
import { SUPPORTED_LOCALES, setLocale } from "./localeResolver";


export function LangSelector() {
  const t = useTranslations('app');
  const locale = useLocale();

  const handleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
      window.location.reload();
    }
  };

  return (
    <Select onValueChange={handleChange} defaultValue={locale}>
      <SelectTrigger className="w-20">
        <SelectValue placeholder={t('language.placeholder')} />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LOCALES.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
