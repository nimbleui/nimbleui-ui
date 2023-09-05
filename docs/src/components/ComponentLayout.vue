<template>
  <YLayout has-sidebar style="height: calc(100vh - var(--y-header-height))" :position="'absolute'">
    <YSidebar>
      <YMenu
        v-model="activeMenuItem"
        all-open
        :items="items"
        key-field="link"
        label-field="text"
        children-field="items"
        @select="onSelect"
        @open-change="onOpenChange"
      ></YMenu>
    </YSidebar>
    <YLayout style="flex: 1" content-style="padding: 30px 20px 0 40px">
      <RouterView />
    </YLayout>
  </YLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { MenuItems } from "@nimble-ui/vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const activeMenuItem = ref(route.path);
const onSelect = (item: MenuItems) => {
  router.push(item.link as string);
};
const onOpenChange = (status: boolean, item: MenuItems) => {
  console.log(status);
  console.log(item);
};
const items = reactive<MenuItems[]>([
  {
    text: "通用组件",
    items: [
      {
        text: "Button 按钮",
        link: "/component/button",
      },
      {
        text: "Card 卡片",
        link: "/component/card",
      },
      {
        text: "Dropdown 下拉菜单",
        link: "/component/dropdown",
      },
    ],
  },
  {
    text: "数据录入组件",
    items: [
      {
        text: "Checkbox 复选框",
        link: "/component/checkbox",
      },
      {
        text: "Form 表单",
        link: "/component/form",
      },
      {
        text: "Input 文本输入",
        link: "/component/input",
      },
    ],
  },
  {
    text: "反馈组件",
    items: [
      {
        text: "Drawer 抽屉",
        link: "/component/drawer",
      },
      {
        text: "Message 信息",
        link: "/component/message",
      },
      {
        text: "Modal 模态框",
        link: "/component/modal",
      },
    ],
  },
]);
</script>

<style lang="scss">
a {
  outline: none;
  text-decoration: none;
  color: var(--y-color-text);
  &.active {
    color: var(--y-color-primary);
  }
}
</style>
