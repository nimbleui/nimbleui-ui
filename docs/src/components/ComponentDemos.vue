<template>
  <div class="component-demos">
    <YButton v-show="show">222</YButton>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const show = ref(true);
</script>

<style lang="scss" scoped></style>
