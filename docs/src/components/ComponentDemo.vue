<template>
  <YCard class="card" content-style="padding: 0">
    <template #header>
      <slot name="head" />
    </template>
    <div class="content">
      <slot name="content" />
      <slot name="demo" />
    </div>

    <div class="operate">
      <YTooltip placement="top" trigger="hover">
        <i class="icon" @click="handleCloneCode">
          <svg fill="none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M753.784471 870.520471c0 34.334118-26.985412 62.162824-60.235295 62.223058h-542.117647c-33.310118 0-60.235294-27.888941-60.235294-62.223058v-559.585883c0-34.334118 26.925176-62.162824 60.235294-62.162823h542.117647c33.249882 0 60.235294 27.828706 60.235295 62.162823v559.585883z m-60.235295-683.91153h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647v559.585883c0 68.668235 53.910588 124.385882 120.470588 124.385882h542.117647c66.499765 0 120.470588-55.657412 120.470589-124.385882v-559.585883c0-68.668235-53.970824-124.325647-120.470589-124.325647"
              fill="currentColor"
            ></path>
            <path
              d="M211.365647 808.056471h240.941177v-62.223059h-240.941177v62.223059z m0-124.385883h421.647059v-62.162823h-421.647059v62.162823z m0-124.325647h421.647059V497.121882h-421.647059v62.223059z m0-124.385882h421.647059V372.856471h-421.647059V434.898824z"
              fill="currentColor"
            ></path>
            <path
              d="M875.098353 0.180706h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647h60.235294c0-34.334118 26.985412-62.162824 60.235294-62.162824h542.117647c33.249882 0 60.235294 27.828706 60.235294 62.162824v559.585882c0 34.334118-26.985412 62.162824-60.235294 62.223059v62.162824c66.56 0 120.470588-55.657412 120.470588-124.385883v-559.585882c0-68.668235-53.910588-124.325647-120.470588-124.325647"
              fill="currentColor"
            ></path>
          </svg>
        </i>
        <template #content> <div class="tooltip">复制代码</div> </template>
      </YTooltip>
      <YTooltip placement="top" trigger="hover">
        <i class="icon" @click="handleShowCode">
          <svg fill="none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M300.224 224L32 525.76l268.224 301.76 71.776-63.776-211.552-237.984 211.552-237.984zM711.744 224L640 287.776l211.552 237.984L640 763.744l71.744 63.776 268.256-301.76z"
              fill="currentColor"
            ></path>
          </svg>
        </i>
        <template #content> <div class="tooltip">显示代码</div> </template>
      </YTooltip>
    </div>
    <template #footer>
      <div v-show="showCode" class="code">
        <YScrollbar trigger="hover" x-scroll>
          <code class="code-wrap">
            <pre ref="codeRef"></pre>
          </code>
        </YScrollbar>
      </div>
    </template>
  </YCard>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue";
import hljs from "highlight.js";
import { YMessage } from "@nimble-ui/vue";

const props = defineProps<{ code: string }>();
const codeRef = ref<HTMLElement>();

const showCode = ref(false);
const handleShowCode = () => {
  showCode.value = !showCode.value;
};
const newCode = hljs.highlightAuto(decodeURIComponent(props.code), ["html", "js", "css"]).value;
onMounted(() => {
  if (codeRef.value) {
    codeRef.value.innerHTML = `${newCode}`;
  }
});

const handleCloneCode = () => {
  const code = decodeURIComponent(props.code);
  navigator.clipboard.writeText(code).then(() => {
    YMessage("复制成功");
  });
};
</script>

<style lang="scss" scoped>
.card {
  .code {
    padding: 20px;
    word-break: break-word;
    font-family: inherit;
    border-top: 1px solid var(--y-color-border-secondary);
    &-wrap {
      font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
      pre {
        font-family: inherit;
        // font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
      }
    }
  }
  .content {
    padding: 10px 20px;
  }
  .operate {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 15px;
    margin: 20px 0 15px;
    border-top: 1px dashed var(--y-color-border-secondary);
    .icon {
      width: 15px;
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
.tooltip {
  padding: 5px 15px;
  border-radius: 5px;
}
</style>
