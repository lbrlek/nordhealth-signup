<template>
  <provet-button
    @click="toggleTheme"
    variant="default"
    size="m"
    :aria-pressed="isDark"
    aria-label="Toggle theme"
  >
    <provet-icon
      :name="isDark ? 'interface-mode-dark' : 'interface-mode-light'"
      size="m"
    />
  </provet-button>
</template>

<script setup>
import { useTheme } from "~/composables/useTheme";

const { isDark, toggleTheme } = useTheme();
</script>
