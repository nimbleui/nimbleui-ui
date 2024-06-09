<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 三种大小
  
  可以通过设置属性size改变大小。
</markdown>

<template>
  <YFlex :gap="8" vertical>
    <YInput size="large" placeholder="大小为large" />
    <YInput placeholder="大小为默认" />
    <YInput size="small" placeholder="大小为small" />
  </YFlex>
</template>
