<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
  # 弹出位置
 
  支持 6 个弹出位置
</markdown>

<template>
  <YSpace :size="8">
    <YDropdown :trigger="'click'" placement="top-start" :options="options" @select="handleSelect">
      <YButton>top-start</YButton>
    </YDropdown>
    <YDropdown :trigger="'hover'" placement="top" :options="options" @select="handleSelect">
      <YButton>top</YButton>
    </YDropdown>
    <YDropdown :trigger="'hover'" placement="top-end" :options="options" @select="handleSelect">
      <YButton>top-end</YButton>
    </YDropdown>
    <YDropdown :trigger="'hover'" placement="bottom-start" :options="options" @select="handleSelect">
      <YButton>bottom-start</YButton>
    </YDropdown>
    <YDropdown :trigger="'hover'" placement="bottom" :options="options" @select="handleSelect">
      <YButton>bottom</YButton>
    </YDropdown>
    <YDropdown :trigger="'hover'" placement="bottom-end" :options="options" @select="handleSelect">
      <YButton>bottom-end</YButton>
    </YDropdown>
  </YSpace>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { YMessage } from "@nimble-ui/vue";

interface Options {
  label: string;
  id: number;
  children?: Options[];
}

const options = reactive<Options[]>([
  {
    label: "春眠不觉晓",
    id: 1,
  },
  {
    label: "处处闻啼鸟",
    id: 2,
  },
  {
    label: "夜来风雨声",
    id: 3,
  },
  {
    label: "花落知多少",
    id: 4,
    children: [
      {
        label: "花落知多少1",
        id: 5,
      },
      {
        label: "花落知多少2",
        id: 6,
      },
      {
        label: "花落知多少3",
        id: 7,
      },
    ],
  },
]);

const handleSelect = (item: Options) => {
  YMessage.info(item.label);
};
</script>
