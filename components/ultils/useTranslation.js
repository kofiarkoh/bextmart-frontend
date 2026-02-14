import { useRouter } from "next/router";
import { useCallback } from "react";
import en from "../../public/locales/en/en";
import fr from "../../public/locales/fr/fr";
import it from "../../public/locales/it/it";
import jp from "../../public/locales/jp/jp";

const TRANSLATIONS = { en, fr, jp, it };

export default function useTranslation() {
  const router = useRouter();
  const { locale, asPath } = router;

  const setLocale = useCallback(
    (locale) => {
      router.push(asPath, asPath, { locale });
    },
    [asPath, router]
  );

  const t = useCallback(
    (keyString) => {
      return TRANSLATIONS[locale][keyString];
    },
    [locale]
  );

  return { t, locale, setLocale };
}