<template>
  <YCard>
    <template #header>
      <slot name="head" />
    </template>
    <slot name="content" />
    <slot name="demo" />
  </YCard>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
