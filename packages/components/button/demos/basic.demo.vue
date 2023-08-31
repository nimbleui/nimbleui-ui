<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
# 基础用法

使用 type、plain、round 和 circle 来定义按钮的样式。
</markdown>

<template>
  <div class="demo-margin">
    <YButton>Default</YButton>
    <YButton :type="'primary'">Primary</YButton>
    <YButton :type="'info'">Info</YButton>
    <YButton :type="'success'">Success</YButton>
    <YButton :type="'warning'">Warning</YButton>
    <YButton :type="'error'">Error</YButton>
  </div>
  <div class="demo-margin">
    <YButton plain>Default</YButton>
    <YButton plain :type="'primary'">Primary</YButton>
    <YButton plain :type="'info'">Info</YButton>
    <YButton plain :type="'success'">Success</YButton>
    <YButton plain :type="'warning'">Warning</YButton>
    <YButton plain :type="'error'">Error</YButton>
  </div>
  <div class="demo-margin">
    <YButton round>Default</YButton>
    <YButton round :type="'primary'">Primary</YButton>
    <YButton round :type="'info'">Info</YButton>
    <YButton round :type="'success'">Success</YButton>
    <YButton round :type="'warning'">Warning</YButton>
    <YButton round :type="'error'">Error</YButton>
  </div>
</template>
