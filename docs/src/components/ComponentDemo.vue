<template>
  <YCard>
    <template #header>
      <slot name="head" />
    </template>
    <slot name="content" />
    <slot name="demo" />

    <template #footer>
      <code v-show="showCode" class="code">
        <slot name="code" />
      </code>
    </template>
  </YCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showCode = ref(true);
</script>

<style lang="scss" scoped>
.code {
  word-break: break-word;
}
</style>
