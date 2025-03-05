<template>
  <div class="language-switcher">
    <provet-button
      variant="default"
      @click="togglePopout"
      aria-controls="language-popout"
      aria-haspopup="true"
    >
      <provet-icon name="interface-globe" size="s" />
      <span class="lang-initials">{{ locale.toUpperCase() }}</span>
    </provet-button>

    <provet-popout id="language-popout" ref="popoutRef" position="block-end">
      <div class="popout-content">
        <provet-stack direction="vertical" gap="s">
          <provet-button
            v-for="l in localeOptions"
            :key="l"
            variant="plain"
            block
            @click="changeLocale(l)"
          >
            {{ getLanguageName(l) }}
          </provet-button>
        </provet-stack>
      </div>
    </provet-popout>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from "~/composables/useLanguage";

const {
  locale,
  localeOptions,
  popoutRef,
  getLanguageName,
  changeLocale,
  togglePopout,
} = useLanguage();
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.popout-content {
  padding: 0;
}

.lang-initials {
  margin-left: var(--n-space-xs);
  text-transform: uppercase;
}
</style>
