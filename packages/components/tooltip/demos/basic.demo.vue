<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YTooltip trigger="hover" placement="top">
    <span>鼠标移上去显示提示语</span>
    <template #content>
      <p>带弹出提示基本的单行省略。</p>
    </template>
  </YTooltip>
</template>
