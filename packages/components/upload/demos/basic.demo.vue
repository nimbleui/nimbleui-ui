<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YUpload v-model:file-list="fileList" />
</template>

<script setup lang="ts">
import { UploadFiles } from "@nimble-ui/vue";
import { reactive } from "vue";

const fileList = reactive<UploadFiles>([
  { name: "11", uid: 1, status: "success" },
  { name: "11", uid: 2, status: "success" },
]);
</script>
