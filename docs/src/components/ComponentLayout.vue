<template>
  <YLayout content-style="height: calc(100vh - var(--y-header-height))" has-sidebar>
    <YSidebar collapsed style="border-right: 1px solid var(--y-color-border-secondary)">
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
    <YContent style="padding: 30px 20px 0 40px">
      <RouterView />
    </YContent>
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
        text: "按钮 Button",
        link: "/component/button",
      },
      {
        text: "卡片 Card",
        link: "/component/card",
      },
      {
        text: "下拉菜单 Dropdown",
        link: "/component/dropdown",
      },
      {
        text: "滚动条 Scrollbar",
        link: "/component/scrollbar",
      },
      {
        text: "回到顶部 BackTop",
        link: "/component/backTop",
      },
      {
        text: "标签页 Tabs",
        link: "/component/tabs",
      },
    ],
  },
  {
    text: "布局组件",
    items: [
      {
        text: "分割线 Divider",
        link: "/component/divider",
      },
      {
        text: "栅格 Grid",
        link: "/component/row",
      },
      {
        text: "间距 Space",
        link: "/component/space",
      },
      {
        text: "布局 Layout",
        link: "/component/layout",
      },
    ],
  },
  {
    text: "数据录入组件",
    items: [
      {
        text: "复选框 Checkbox",
        link: "/component/checkbox",
      },
      {
        text: "表单 Form",
        link: "/component/form",
      },
      {
        text: "文本输入 Input",
        link: "/component/input",
      },
      {
        text: "开关 Switch",
        link: "/component/switch",
      },
    ],
  },
  {
    text: "反馈组件",
    items: [
      {
        text: "抽屉 Drawer",
        link: "/component/drawer",
      },
      {
        text: "信息 Message",
        link: "/component/message",
      },
      {
        text: "模态框 Modal",
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
