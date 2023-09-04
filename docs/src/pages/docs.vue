<template>
  <YLayout has-sidebar>
    <YSidebar>
      <YMenu :items="items" />
    </YSidebar>
    <YLayout></YLayout>
  </YLayout>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { MenuItems } from "@nimble-ui/vue";

defineOptions({
  name: "DocsPage",
});

const items = reactive<MenuItems[]>([
  {
    label: "介绍",
    children: [
      {
        label: "Nimble UI",
        key: "/docs/introduction",
      },
    ],
  },
  {
    label: "快速上手",
    children: [
      {
        label: "安装",
        key: "/docs/installation",
      },
    ],
  },
]);
</script>

<style lang="scss" scoped></style>
