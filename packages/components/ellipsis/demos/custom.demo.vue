<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 定制 Tooltip 内容
  
  通过tooltip插槽定制提升内容。
</markdown>

<template>
  <YEllipsis style="max-width: 240px">
    春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。
    <template #tooltip>
      春晓是唐代诗人孟浩然创作的一首五言绝句，这首诗写的是春日黎明时的景色，表达了诗人对春天的热爱之情。
    </template>
  </YEllipsis>
</template>
