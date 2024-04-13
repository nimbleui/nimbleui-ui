<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法
</markdown>

<template>
  <YPopper placement="left-start" trigger="hover">
    <YButton>标题</YButton>
    <template #content>
      <div class="popper-content"></div>
    </template>
  </YPopper>
</template>

<style lang="scss">
.popper-content {
  width: 100px;
  height: 200px;
  background-color: red;
}
</style>
