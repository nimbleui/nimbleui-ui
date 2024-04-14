<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法
</markdown>

<template>
  <YFlex :gap="15">
    <YPopper placement="top">
      <YButton>触发方式：click</YButton>
      <template #content>
        <div class="popper-content"></div>
      </template>
    </YPopper>

    <YPopper placement="bottom" trigger="hover">
      <YButton>触发方式：hover</YButton>
      <template #content>
        <div class="popper-content"></div>
      </template>
    </YPopper>

    <YPopper trigger="focus">
      <YInput />
      <template #content>
        <div class="popper-content"></div>
      </template>
    </YPopper>
  </YFlex>
</template>

<style lang="scss">
.popper-content {
  width: 100px;
  height: 200px;
  background-color: red;
}
</style>
