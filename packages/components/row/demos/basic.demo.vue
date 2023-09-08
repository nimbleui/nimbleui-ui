<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <div class="demo-margin">
    <YRow>
      <YCol><div class="demo-primary">col-24</div></YCol>
    </YRow>
    <YRow>
      <YCol :span="12"><div class="demo-primary">col-12</div></YCol>
      <YCol :span="12"><div class="demo-primary-8">col-12</div></YCol>
    </YRow>
    <YRow>
      <YCol :span="8"><div class="demo-primary">col-8</div></YCol>
      <YCol :span="8"><div class="demo-primary-8">col-8</div></YCol>
      <YCol :span="8"><div class="demo-primary">col-8</div></YCol>
    </YRow>
    <YRow>
      <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
      <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
      <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
      <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
    </YRow>
  </div>
</template>
