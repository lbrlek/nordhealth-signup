<template>
  <provet-stack
    class="signin-stack"
    direction="vertical"
    align-items="center"
    justify-content="center"
    gap="xl"
  >
    <provet-card padding="l">
      <h1 slot="header" class="provet-title">{{ $t("success.heading") }}</h1>
      <p>{{ $t("success.message") }}</p>
      <p v-if="optedForUpdates">
        {{ $t("success.opted_in_for_updates") }}
      </p>

      <provet-button variant="primary" type="submit" @click="goHome">
        {{ $t("success.go_back") }}
      </provet-button>
    </provet-card>
  </provet-stack>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const optedForUpdates = computed(() => route.query.updates === "true");

function goHome() {
  navigateTo("/");
}
</script>
