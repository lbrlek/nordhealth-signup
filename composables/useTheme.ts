import { ref, onMounted } from "vue";

const THEME_KEY = "theme";
const LIGHT_THEME = "https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet.css";
const DARK_THEME = "https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet-dark.css";

export function useTheme() {
  const isDark = ref(false);
  const liveRegion = document.createElement("div");

  // Accessibility: Create a hidden live region for screen readers
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("role", "status");
  liveRegion.style.position = "absolute";
  liveRegion.style.width = "1px";
  liveRegion.style.height = "1px";
  liveRegion.style.overflow = "hidden";
  liveRegion.style.clip = "rect(1px, 1px, 1px, 1px)";
  document.body.appendChild(liveRegion);

  const applyTheme = (dark: boolean) => {
    const themeHref = dark ? DARK_THEME : LIGHT_THEME;
    let themeLink = document.getElementById("theme-link") as HTMLLinkElement;

    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = "theme-link";
      themeLink.rel = "stylesheet";
      document.head.appendChild(themeLink);
    }

    themeLink.href = themeHref;
    isDark.value = dark;
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");

    // Accessibility: Announce the theme change to screen readers
    liveRegion.textContent = dark ? "Dark mode enabled" : "Light mode enabled";
  };

  const toggleTheme = () => applyTheme(!isDark.value);

  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      applyTheme(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark);
    }
  });

  return { isDark, toggleTheme };
}
