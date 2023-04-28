<template>
  <div>
    <YRow justify="space-around" :gutter="8">
      <YCol :span="8">
        <div class="item"></div>
      </YCol>
      <YCol :span="8">
        <div class="item"></div>
      </YCol>
      <YCol :span="8">
        <div class="item"></div>
      </YCol>
    </YRow>
    <YRow :gutter="20">
      <YCol :span="8" :offset="2">
        <div class="item"></div>
      </YCol>
      <YCol :span="8" :offset="4">
        <div class="item"></div>
      </YCol>
    </YRow>
    <YButton :content="renderContent" />
  </div>
</template>

<script setup lang="tsx">
import { h } from "vue";

const renderContent = () => h("div", {}, "23432432dfasdf");
</script>
<style>
.item {
  height: 20px;
  background-color: aliceblue;
  margin-bottom: 5px;
}
</style>
