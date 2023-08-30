<template>
  <YCard>
    <template #header>
      <slot name="head" />
    </template>
    <slot name="content" />
    <slot name="demo" />

    <template #footer>
      <div v-show="showCode">
        <code ref="codeRef" class="code"></code>
      </div>
    </template>
  </YCard>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import hljs from "highlight.js";

const props = defineProps<{ code: string }>();
const codeRef = ref<HTMLElement>();

const showCode = ref(true);
const newCode = hljs.highlightAuto(decodeURIComponent(props.code), ["html", "js", "css"]).value;
onMounted(() => {
  if (codeRef.value) {
    codeRef.value.innerHTML = `<pre>${newCode}</pre>`;
  }
});
</script>

<style lang="scss" scoped>
.code {
  word-break: break-word;
  font-family: inherit;
  pre {
    font-family: inherit;
  }
}
</style>
