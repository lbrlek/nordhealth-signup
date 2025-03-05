import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const LANGUAGE_KEY = "selectedLanguage";
const localeOptions = ["en", "fi", "de"] as const;

const getSavedLanguage = (): "en" | "fi" | "de" | null => {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  return savedLanguage && ["en", "fi", "de"].includes(savedLanguage) 
    ? (savedLanguage as "en" | "fi" | "de") 
    : null;
};

export function useLanguage() {
  const { locale } = useI18n();
  const popoutRef = ref<HTMLElement | null>(null);
  const isOpen = ref(false);

  const getLanguageName = (lang: string) => {
    const languageMap: Record<string, string> = {
      en: "English",
      fi: "Finnish",
      de: "German",
    };
    return languageMap[lang] || lang.toUpperCase();
  };

  const changeLocale = (newLocale: "en" | "fi" | "de") => {
    locale.value = newLocale;
    document.documentElement.lang = newLocale;
    localStorage.setItem(LANGUAGE_KEY, newLocale);

    if (popoutRef.value) {
      (popoutRef.value as any).hide();
      isOpen.value = false;
    }
  };

  const togglePopout = () => {
    if (!popoutRef.value) {
      return;
    }
    if (isOpen.value) {
      (popoutRef.value as any).hide();
      isOpen.value = false;
    } else {
      setTimeout(() => {
        (popoutRef.value as any).show();
        isOpen.value = true;
      }, 10);
    }
  };

  onMounted(() => {
    const savedLanguage = getSavedLanguage();
    if (savedLanguage) {
      locale.value = savedLanguage;
      document.documentElement.lang = savedLanguage;
    }
  });

  return {
    locale,
    localeOptions,
    popoutRef,
    getLanguageName,
    changeLocale,
    togglePopout,
  };
}
