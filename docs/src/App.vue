<template>
  <YLayout>
    <YHeader class="header">
      <div class="header-log">log</div>
      <div class="header-content">
        <div class="header-content__search">
          <YInput placeholder="输入关键字搜索..." />
        </div>
        <div class="header-content__menu">
          <span>首页</span>
          <span>文档</span>
          <span>组件</span>
          <span @click="toggleTheme">{{ isDark ? "浅色" : "深色" }}</span>
        </div>
      </div>
    </YHeader>
    <YSidebar>
      <YMenu all-open :indent="16" children-field="items" label-field="text" :items="items">
        <template #item="{ item }">{{ item.text }}</template>
      </YMenu>
    </YSidebar>
    <RouterView></RouterView>
  </YLayout>
</template>

<script setup lang="tsx">
import { ref, reactive } from "vue";
import { MenuItems, useTheme } from "yy-ui";

const isDark = ref(false);
const toggleTheme = () => {
  isDark.value = !isDark.value;
  useTheme({}, isDark.value ? "dark" : "light");
};

const items = reactive<MenuItems[]>([
  {
    text: "通用组件",
    items: [
      {
        text: "Button 按钮",
        link: "/button",
      },
      {
        text: "Button 按钮",
        link: "",
      },
    ],
  },
  {
    text: "数据录入组件",
    items: [
      {
        text: "Form 表单",
        link: "/form",
      },
      {
        text: "Input 文本输入",
        link: "/input",
      },
    ],
  },
]);
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.header {
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: var(--y-font-size);

  &-log {
    padding-left: 10px;
    width: 250px;
    box-sizing: border-box;
  }

  &-content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;

    &__search {
      width: 200px;
    }

    &__menu {
      display: flex;

      & > span {
        display: block;
        margin: 0 15px;
        cursor: pointer;
        &:hover {
          color: var(--y-color-primary);
        }
      }
    }
  }
}
</style>
