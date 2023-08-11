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
    <YSidebar></YSidebar>
  </YLayout>
</template>

<script setup lang="tsx">
import { ref } from "vue";
import { useTheme } from "yy-ui";
import { useData } from "vitepress";

const { site } = useData();
console.log(site);
const isDark = ref(false);
const toggleTheme = () => {
  isDark.value = !isDark.value;
  useTheme({}, isDark.value ? "dark" : "light");
};
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
