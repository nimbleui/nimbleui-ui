<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-show="show" class="">
    <YButton>测试</YButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const show = ref(true);
</script>

<style lang="scss" scoped></style>
