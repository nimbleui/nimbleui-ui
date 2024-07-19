<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 位置
  
  位置有 12 个方向。
</markdown>

<template>
  <div class="warp">
    <div class="flex">
      <div class="flex-v">
        <YTooltip trigger="hover" placement="top-start">
          <YButton :style="buttonStyle" @click="$router.push('/component/slider')">TL</YButton>
          <template #content>提示文本 TL</template>
        </YTooltip>
        <YTooltip trigger="hover" placement="top">
          <YButton :style="buttonStyle">T</YButton>
          <template #content>提示文本 T</template>
        </YTooltip>
        <YTooltip trigger="hover" placement="top-end">
          <YButton :style="buttonStyle">TR</YButton>
          <template #content>提示文本 TR</template>
        </YTooltip>
      </div>
      <div class="flex-c">
        <div class="flex-l">
          <YTooltip trigger="hover" placement="left-start">
            <YButton :style="buttonStyle">LT</YButton>
            <template #content>提示文本 LT</template>
          </YTooltip>
          <YTooltip trigger="hover" placement="left">
            <YButton :style="buttonStyle">L</YButton>
            <template #content>提示文本 L</template>
          </YTooltip>
          <YTooltip trigger="hover" placement="left-end">
            <YButton :style="buttonStyle">LB</YButton>
            <template #content>提示文本 LB </template>
          </YTooltip>
        </div>
        <div class="flex-l">
          <YTooltip trigger="hover" placement="right-start">
            <YButton :style="buttonStyle">RT</YButton>
            <template #content>提示文本 RT</template>
          </YTooltip>
          <YTooltip trigger="hover" placement="right">
            <YButton :style="buttonStyle">R</YButton>
            <template #content>提示文本 R</template>
          </YTooltip>
          <YTooltip trigger="hover" placement="right-end">
            <YButton :style="buttonStyle">RB</YButton>
            <template #content>提示文本 RB</template>
          </YTooltip>
        </div>
      </div>
      <div class="flex-v">
        <YTooltip trigger="hover" placement="bottom-start">
          <YButton :style="buttonStyle">BL</YButton>
          <template #content>提示文本 BL</template>
        </YTooltip>
        <YTooltip trigger="hover" placement="bottom">
          <YButton :style="buttonStyle">B</YButton>
          <template #content>提示文本 B</template>
        </YTooltip>
        <YTooltip trigger="hover" placement="bottom-end">
          <YButton :style="buttonStyle">BR</YButton>
          <template #content>提示文本 BR</template>
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
