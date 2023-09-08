<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 自定义尺寸
  
  自定义间距大小。
</markdown>

<template>
  <YInput v-model="gap" style="margin-bottom: 10px" placeholder="请输入间隙" />
  <YSpace :size="size">
    <YButton>vertical</YButton>
    <YButton>vertical</YButton>
    <YButton>vertical</YButton>
  </YSpace>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const gap = ref(12);
const size = computed(() => (gap.value ? Number(gap.value) : 0));
</script>
