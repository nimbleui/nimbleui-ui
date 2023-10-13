<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 位置
  
  位置有 12 个方向。
</markdown>

<template>
  <div class="warp">
    <div class="flex">
      <div class="flex-v">
        <YTooltip placement="top-start">
          <YButton :style="buttonStyle">TL</YButton>
          <template #content> 提示文本 </template>
        </YTooltip>
        <YTooltip placement="top">
          <YButton :style="buttonStyle">T</YButton>
          <template #content> 提示文本 </template>
        </YTooltip>
        <YTooltip placement="top-end">
          <YButton :style="buttonStyle">TR</YButton>
          <template #content> 提示文本 </template>
        </YTooltip>
      </div>
      <div class="flex-c">
        <div class="flex-l">
          <YTooltip placement="left-start">
            <YButton :style="buttonStyle">LT</YButton>
            <template #content> 提示文本 </template>
          </YTooltip>
          <YTooltip placement="left">
            <YButton :style="buttonStyle">L</YButton>
            <template #content> 提示文本 </template>
          </YTooltip>
          <YTooltip placement="left-end">
            <YButton :style="buttonStyle">LB</YButton>
            <template #content> 提示文本 </template>
          </YTooltip>
        </div>
        <div class="flex-l">
          <YTooltip placement="right-start">
            <YButton :style="buttonStyle">RT</YButton>
            <template #content> 提示文本 </template>
          </YTooltip>
          <YTooltip placement="right">
            <YButton :style="buttonStyle">R</YButton>
            <template #content> 提示文本 </template>
          </YTooltip>
          <YTooltip placement="right-end">
            <YButton :style="buttonStyle">RB</YButton>
            <template #content> 提示文本 </template>
          </YTooltip>
        </div>
      </div>
      <div class="flex-v">
        <YTooltip placement="bottom-start">
          <YButton :style="buttonStyle">BL</YButton>
          <template #content> 提示文本 </template>
        </YTooltip>
        <YTooltip placement="bottom">
          <YButton :style="buttonStyle">B</YButton>
          <template #content> 提示文本 </template>
        </YTooltip>
        <YTooltip placement="bottom-end">
          <YButton :style="buttonStyle">BR</YButton>
          <template #content> 提示文本 </template>
        </YTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const buttonStyle = reactive({
  width: "78px",
});
</script>

<style lang="scss">
.warp {
  display: flex;
  justify-content: center;
  .flex {
    display: flex;
    flex-direction: column;
    width: 450px;
    &-v {
      display: flex;
      justify-content: center;
      gap: 8px;
    }
    &-c {
      display: flex;
      justify-content: space-between;
    }
    &-l {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
}
</style>
