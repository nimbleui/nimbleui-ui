<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YUpload v-model:file-list="fileList" :max-count="1" :list-type="'picture-card'" />
</template>

<script setup lang="ts">
import { UploadFiles } from "@nimble-ui/vue";
import { reactive } from "vue";

const fileList = reactive<UploadFiles>([]);
</script>
