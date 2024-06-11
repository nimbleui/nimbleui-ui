<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 格式化
  
  在formatter的格式化显示值，parser格式化v-model绑定的值
</markdown>

<template>
  <YInput
    v-model="value"
    size="large"
    :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
    placeholder="请输入"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
const value = ref("");
watch(value, (val) => {
  console.log(val);
});
</script>
