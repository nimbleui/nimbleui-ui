<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 自定义位置
  
  自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭。
</markdown>

<template>
  <YButtonGroup type="primary">
    <YButton @click="onOpen('top')">top</YButton>
    <YButton @click="onOpen('right')">right</YButton>
    <YButton @click="onOpen('bottom')">bottom</YButton>
    <YButton @click="onOpen('left')">left</YButton>
  </YButtonGroup>
  <YDrawer v-model="show" :direction="direction"></YDrawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DrawerDirection } from "@nimble-ui/vue";
const show = ref(false);
const direction = ref<DrawerDirection>("right");

const onOpen = (type: DrawerDirection) => {
  show.value = true;
  direction.value = type;
};
</script>
