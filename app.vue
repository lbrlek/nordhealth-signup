<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
if (process.client) {
  import("@provetcloud/web-components");
}
</script>
