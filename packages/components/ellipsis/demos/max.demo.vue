<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 最大行数
  
  最大显示多少行，多出的隐藏
</markdown>

<template>
  <YEllipsis :line-clamp="3">
    <p style="text-align: center">《回乡偶书》</p>
    <br />
    <p>少小离家老大回，乡音无改鬓毛衰。</p>
    <p>儿童相见不相识，笑问客从何处来。</p>
  </YEllipsis>
</template>
