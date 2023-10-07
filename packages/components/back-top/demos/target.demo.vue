<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 指定监听目标
  
  可以通过改变 `listen-to` 属性指定监听元素
</markdown>

<template>
  <div ref="scrollContainerRef" style="height: 100px; overflow-y: scroll">
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
    <p>可以通过改变 `listen-to` 属性指定监听元素</p>
  </div>
  <YBackTop :scroll-top="100" :listen-to="scrollContainerRef" :bottom="160">
    <div style="padding: 0 30px">监听目标</div>
  </YBackTop>
</template>

<script setup lang="ts">
import { ref } from "vue";
const scrollContainerRef = ref<HTMLElement>();
</script>
