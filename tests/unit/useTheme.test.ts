import { useTheme } from "../../composables/useTheme";
import { describe, it, expect, beforeEach } from "vitest";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();

    const existingThemeLink = document.getElementById("theme-link");
    if (existingThemeLink) {
      existingThemeLink.remove();
    }
  });

  it("should apply dark theme and save it to localStorage", () => {
    const { isDark, toggleTheme } = useTheme();

    toggleTheme();

    expect(isDark.value).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.querySelector("#theme-link")?.getAttribute("href")).toBe(
      "https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet-dark.css"
    );
  });

  it("should apply light theme and save it to localStorage", () => {
    const { isDark, toggleTheme } = useTheme();

    toggleTheme(); // Dark mode
    toggleTheme(); // Light mode

    expect(isDark.value).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.querySelector("#theme-link")?.getAttribute("href")).toBe(
      "https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet.css"
    );
  });
});
