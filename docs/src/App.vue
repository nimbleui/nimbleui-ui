<template>
  <YLayout :position="'absolute'">
    <YHeader class="header">
      <div class="header-log">log</div>
      <div class="header-content">
        <div class="header-content__search">
          <YInput placeholder="输入关键字搜索..." />
        </div>
        <div class="header-content__menu">
          <span @click="goPage('/home')">首页</span>
          <span @click="goPage('/docs')">文档</span>
          <span @click="goPage('/component/button')">组件</span>
          <span @click="toggleTheme">{{ isDark ? "浅色" : "深色" }}</span>
        </div>
      </div>
    </YHeader>
    <RouterView></RouterView>
  </YLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "yy-ui";
import { useRouter } from "vue-router";
const router = useRouter();

const goPage = (path: string) => router.push(path);

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
