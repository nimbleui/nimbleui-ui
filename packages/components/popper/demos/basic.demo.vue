<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法
</markdown>

<template>
  <YPopper>
    <YButton>标题</YButton>
    <template #content>
      <div class="content"></div>
    </template>
  </YPopper>
</template>

<style lang="scss">
.content {
  width: 150px;
  height: 300px;
  background-color: red;
}
</style>
