<template>
  <provet-stack
    class="signin-stack"
    direction="vertical"
    align-items="stretch"
    justify-content="center"
    gap="xl"
  >
    <provet-card padding="l">
      <h1 slot="header" class="provet-title">{{ $t("signup.title") }}</h1>
      <SignupForm />
    </provet-card>
  </provet-stack>
</template>

<script setup lang="ts">
import SignupForm from "~/components/SignupForm.vue";
</script>
