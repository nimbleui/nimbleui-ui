<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  典型的页面布局。
</markdown>

<template>
  <YSpace vertical style="width: 100%" :size="[20, 0]">
    <YLayout>
      <YHeader :style="headerStyle">header</YHeader>
      <YContent :style="contentStyle">content</YContent>
      <YFooter :style="footerStyle">footer</YFooter>
    </YLayout>

    <YLayout>
      <YHeader :style="headerStyle">header</YHeader>
      <YLayout has-sidebar :style="contentStyle">
        <YSidebar :style="sidebarStyle">sidebar</YSidebar>
        <YContent :style="contentStyle">content</YContent>
      </YLayout>
      <YFooter :style="footerStyle">footer</YFooter>
    </YLayout>

    <YLayout>
      <YHeader :style="headerStyle">header</YHeader>
      <YLayout has-sidebar :style="contentStyle">
        <YContent :style="contentStyle">content</YContent>
        <YSidebar :style="sidebarStyle">sidebar</YSidebar>
      </YLayout>
      <YFooter :style="footerStyle">footer</YFooter>
    </YLayout>

    <YLayout has-sidebar>
      <YSidebar :style="sidebarStyle">sidebar</YSidebar>
      <YLayout>
        <YHeader :style="headerStyle">header</YHeader>
        <YContent :style="contentStyle">content</YContent>
        <YFooter :style="footerStyle">footer</YFooter>
      </YLayout>
    </YLayout>
  </YSpace>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const headerStyle = reactive({
  lineHeight: "64px",
  backgroundColor: "var(--y-color-primary-5)",
  color: "#fff",
  textAlign: "center",
});

const contentStyle = reactive({
  textAlign: "center",
  minHeight: "120px",
  lineHeight: "120px",
  color: " #fff",
  backgroundColor: "var(--y-color-primary)",
});

const footerStyle = reactive({
  backgroundColor: "var(--y-color-primary-5)",
  color: "#fff",
  textAlign: "center",
});

const sidebarStyle = reactive({
  backgroundColor: "var(--y-color-primary-4)",
  color: "#fff",
  textAlign: "center",
  lineHeight: "120px",
});
</script>
