<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 响应式布局
  
  响应式布局
</markdown>

<template>
  <div class="demo-margin">
    <YRow>
      <YCol :xl="6" :lg="8" :sm="12">
        <div class="demo-primary">col</div>
      </YCol>
      <YCol :xl="6" :lg="8" :sm="12">
        <div class="demo-primary-8">col</div>
      </YCol>
      <YCol :xl="6" :lg="8" :sm="12">
        <div class="demo-primary">col</div>
      </YCol>
      <YCol :xl="6" :lg="8" :sm="12">
        <div class="demo-primary-8">col</div>
      </YCol>
    </YRow>
  </div>
</template>
