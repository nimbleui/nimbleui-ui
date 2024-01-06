<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 按钮组
  
  把几个按钮结合成按钮组。
</markdown>

<template>
  <YFlex vertical :gap="10">
    <YButtonGroup type="primary">
      <YButton>按钮</YButton>
      <YButton>按钮</YButton>
      <YButton>按钮</YButton>
    </YButtonGroup>
    <YButtonGroup :size="'small'">
      <YButton>按钮</YButton>
      <YButton>按钮</YButton>
      <YButton>按钮</YButton>
    </YButtonGroup>
  </YFlex>
</template>
