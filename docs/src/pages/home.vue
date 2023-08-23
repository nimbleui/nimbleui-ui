<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="">
    <YButton @click="onShow">显示</YButton>
    <YDrawer v-model="show" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
const onShow = () => {
  show.value = true;
};
</script>

<style lang="scss" scoped></style>
