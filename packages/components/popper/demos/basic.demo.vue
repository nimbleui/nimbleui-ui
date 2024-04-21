<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法
</markdown>

<template>
  <YFlex wrap :gap="15">
    <YPopper placement="top">
      <template #trigger>
        <YButton>触发方式：click</YButton>
      </template>
      <div class="popper-content"></div>
    </YPopper>

    <YPopper placement="bottom" trigger="hover">
      <template #trigger>
        <YButton>触发方式：hover</YButton>
      </template>
      <div class="popper-content"></div>
    </YPopper>

    <YPopper trigger="focus">
      <template #trigger>
        <YInput />
      </template>
      <div class="popper-content"></div>
    </YPopper>

    <YPopper @outside="onOutside">
      <template #trigger> 只有文本 </template>
      <div class="popper-content"></div>
    </YPopper>

    <div class="trigger" @contextmenu="onContextmenu"></div>
    <YPopper v-model="show" trigger="manual" v-bind="client">厉害</YPopper>
  </YFlex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const onOutside = (e: MouseEvent) => {
  console.log(e);
};
const show = ref(false);
const client = reactive({ left: 0, top: 0 });
const onContextmenu = (e: MouseEvent) => {
  e.preventDefault();
  show.value = true;
  client.left = e.pageX;
  client.top = e.pageY;
};
</script>

<style lang="scss">
.popper-content {
  width: 100px;
  height: 200px;
  background-color: red;
}
.trigger {
  width: 300px;
  height: 300px;
  background-color: rgba(0, 128, 0, 0.5);
}
</style>
