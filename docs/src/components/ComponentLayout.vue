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
      >
        <template #item="{ item }">
          <RouterLink :to="item.link">{{ item.text }}</RouterLink>
        </template>
      </YMenu>
    </YSidebar>
    <YLayout style="flex: 1; margin-left: 10px">
      <RouterView />
    </YLayout>
  </YLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { MenuItems } from "yy-ui";
import { useRoute } from "vue-router";

const route = useRoute();

const activeMenuItem = ref(route.path);

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
