<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法，支持确认标题和描述。
</markdown>

<template>
  <YPopConfirm title="标题" description="您确定要删除此任务吗?">
    <YButton plain :type="'error'">Delete</YButton>
  </YPopConfirm>
</template>
