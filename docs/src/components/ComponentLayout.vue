<template>
  <YLayout has-sidebar style="top: var(--y-header-height)" :position="'absolute'">
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
    <YLayout style="flex: 1; margin-left: 10px">
      <RouterView />
    </YLayout>
  </YLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { MenuItems } from "yy-ui";
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
    ],
  },
  {
    text: "数据录入组件",
    items: [
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
