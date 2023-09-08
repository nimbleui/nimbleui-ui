<template>
  <div id="app" class="app">
    <YLayout style="height: 100vh" :position="'absolute'">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "@nimble-ui/vue";
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
.app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
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
.md-head {
  font-weight: 500;
  margin-bottom: 15px;
  &-1 {
    font-size: 25px;
  }
  &-2 {
    font-size: 18px;
  }
  &-3 {
    margin-top: 20px;
  }
}
.md-p {
  margin-bottom: 10px;
}
.demo-margin {
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 10px 10px 0 0;
  }
  .y-row {
    flex: 100%;
  }
}

.demo-table {
  text-align: left;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--y-color-bg-container);
  font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
  &__head {
    background-color: var(--y-color-bg-elevated);
    th {
      white-space: nowrap;
      text-align: inherit;
      padding: 12px;
      vertical-align: inherit;
      text-transform: none;
      font-weight: 500;
    }
  }
  &__body {
    td {
      padding: 12px;
      .cell-div {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        code {
          background-color: var(--y-color-info-3);
          padding: 2px 6px;
          border-radius: 3px;
          font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
        }
      }
      &:nth-of-type(4) {
        width: 35%;
      }
    }
  }
}
.component-demos {
  display: grid;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}
.docs {
  margin-bottom: 20px;
}
.dome-100 {
  width: 100%;
}
.demo-primary {
  padding: 10px;
  background-color: var(--y-color-primary);
}
.demo-primary-8 {
  padding: 10px;
  background-color: var(--y-color-primary-8);
}
</style>
