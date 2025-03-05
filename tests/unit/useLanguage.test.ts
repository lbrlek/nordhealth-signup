import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { defineComponent, nextTick } from "vue";
import { describe, it, expect, beforeEach } from "vitest";
import { useLanguage } from "../../composables/useLanguage";

const LANGUAGE_KEY = "selectedLanguage";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  messages: {
    en: {},
    fi: {},
    de: {},
  },
});

describe("useLanguage (with real i18n)", () => {
  let wrapper;

  beforeEach(() => {
    localStorage.clear();

    wrapper = mount(
      defineComponent({
        setup: useLanguage,
        template: "<div></div>",
      }),
      { global: { plugins: [i18n] } }
    );
  });

  it("should update language and save it to localStorage", async () => {
    const { changeLocale } = wrapper.vm;

    changeLocale("fi");
    await nextTick();

    expect(i18n.global.locale.value).toBe("fi");
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe("fi");
    expect(document.documentElement.lang).toBe("fi");
  });

  it("should load saved language from localStorage on mount", async () => {
    localStorage.setItem(LANGUAGE_KEY, "de");

    wrapper = mount(
      defineComponent({
        setup: useLanguage,
        template: "<div></div>",
      }),
      { global: { plugins: [i18n] } }
    );

    await nextTick();

    expect(i18n.global.locale.value).toBe("de");
    expect(document.documentElement.lang).toBe("de");
  });
});
