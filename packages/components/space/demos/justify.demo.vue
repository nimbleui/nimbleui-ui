<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 对齐
  
  设置不同的对齐模式。
</markdown>

<template>
  <div class="demo-margin">
    <div style="border: 1px solid var(--y-color-primary-8)">
      <YSpace align="center">
        center
        <YButton>center</YButton>
        <div style="height: 100px; width: 50px; background-color: var(--y-color-info-6)"></div>
      </YSpace>
    </div>
    <div style="border: 1px solid var(--y-color-primary-8)">
      <YSpace align="start">
        center
        <YButton>center</YButton>
        <div style="height: 100px; width: 50px; background-color: var(--y-color-info-6)"></div>
      </YSpace>
    </div>
    <div style="border: 1px solid var(--y-color-primary-8)">
      <YSpace align="end">
        center
        <YButton>center</YButton>
        <div style="height: 100px; width: 50px; background-color: var(--y-color-info-6)"></div>
      </YSpace>
    </div>
  </div>
</template>
