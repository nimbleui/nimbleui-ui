<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。
</markdown>

<template>
  <YButton type="primary" @click="onOpen">open</YButton>
  <YDrawer v-model="show"></YDrawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
const show = ref(false);

const onOpen = () => {
  show.value = true;
};
</script>
