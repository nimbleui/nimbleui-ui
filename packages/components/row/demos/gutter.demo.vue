<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 区块间隔
  
  栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性，默认值为0。
</markdown>

<template>
  <p class="md-p">水平距离</p>
  <YRow :gutter="10">
    <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
  </YRow>

  <p class="md-p">水平、垂直间距</p>
  <YRow :gutter="[10, 12]">
    <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary">col-6</div></YCol>
    <YCol :span="6"><div class="demo-primary-8">col-6</div></YCol>
  </YRow>
</template>
