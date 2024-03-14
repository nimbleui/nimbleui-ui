<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
# 类型

有`success`、`error`、`warning`、`info`类型。
</markdown>

<template>
  <YFlex :gap="20" align="center">
    <YBadge dot>
      <div class="badge"></div>
    </YBadge>
    <YBadge dot type="success">
      <div class="badge"></div>
    </YBadge>
    <YBadge dot type="warning">
      <div class="badge"></div>
    </YBadge>
    <YBadge dot type="info">
      <div class="badge"></div>
    </YBadge>
  </YFlex>
</template>

<style scoped>
.badge {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  background-color: var(--y-color-info-9);
}
</style>
