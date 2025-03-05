<template>
  <div class="layout-container">
    <provet-top-bar>
      <provet-button-group slot="end">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </provet-button-group>
    </provet-top-bar>

    <div class="page-container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import LanguageSwitcher from "~/components/LanguageSwitcher.vue";
import ThemeSwitcher from "~/components/ThemeSwitcher.vue";
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: var(--p-space-xl);
}
</style>
