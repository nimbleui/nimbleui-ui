<template>
  <div>
    <!-- <YRow :details="a" justify="space-around" :gutter="8" :span="span">
      <YCol uu-id="1">
        <div class="item"></div>
      </YCol>
      <YCol uu-id="2">
        <div class="item"></div>
      </YCol>
      <YCol uu-id="3">
        <div class="item"></div>
      </YCol>
    </YRow>
    <YRow :gutter="20">
      <YCol :span="8" :offset="2">
        <div class="item"></div>
      </YCol>
      <YCol :span="8" :offset="4">
        <div class="item"></div>
      </YCol>
    </YRow>
    <YButton shape="round" :content="renderContent" />
    <YButton disabled :content="renderContent" />
    <YButton type="primary" :content="renderContent" />
    <YButton type="success" :content="renderContent" />
    <YButton type="warning" :content="renderContent" />
    <YButton type="error" :content="renderContent" />
    <YButton type="info" :content="renderContent" />
    <YButton shape="circle">
      <div class="circle">圆</div>
    </YButton>

    <YButtonGroup>
      <YButton>1111</YButton>
      <YButton>2222</YButton>
      <YButton>3333</YButton>
    </YButtonGroup>
    {{ a.num }} -->
    <YButton form="form" native-type="submit">提交</YButton>
    <!-- <div style="height: 1000px"></div> -->
    <YForm id="form" :span="formSpan" :details="values" scroll-to-error :gutter="10" @submit="onSubmit">
      <YFormItem uu-id="1">
        <template #label>名称1</template>
        <YInput v-model="values.name" placeholder="请输入：" disabled name="name" />
      </YFormItem>
      <YFormItem uu-id="2" label="内容：" :rules="{ required: true, message: '不能为空' }">
        <YInput v-model="values.value" clear-trigger="always" placeholder="请输入" name="value" />
      </YFormItem>
      <YFormItem uu-id="3" label="年龄：" :rules="{ required: true, message: '不能为空' }">
        <YInput v-model="values.age" placeholder="请输入" name="age" />
      </YFormItem>
      <YFormItem v-if="show" uu-id="4" label="测试：">
        <YInput v-model="values.test" placeholder="请输入" name="test" />
      </YFormItem>
      <YFormItem :span="24">
        <template #label>CheckboxGroup的disabled为对象：</template>
        <YCheckboxGroup name="checkbox3" :disabled="{ 1: [3] }">
          <YCheckbox label="多选框组1" :value="1" :uu-id="1" />
          <YCheckbox label="多选框组2" shape="round" :value="2" :uu-id="2" />
          <YCheckbox label="多选框组3" shape="round" :value="3" :uu-id="3" />
        </YCheckboxGroup>
      </YFormItem>
      <YFormItem :span="24">
        <template #label>CheckboxGroup的disabled为布尔值：</template>
        <YCheckboxGroup name="checkbox2" :disabled="disabled">
          <YCheckbox label="多选框组1" :value="1" :uu-id="1" />
          <YCheckbox label="多选框组2" shape="round" :value="2" :uu-id="2" />
          <YCheckbox label="多选框组3" shape="round" :value="3" :uu-id="3" />
        </YCheckboxGroup>
      </YFormItem>
      <YFormItem :span="24">
        <template #label>CheckboxGroup的disabled为函数：</template>
        <YCheckboxGroup v-model="checkeds" name="checkbox1" :disabled="disabledFn">
          <YCheckbox label="多选框组1" :details="{ a: 1 }" :value="1" :uu-id="1" />
          <YCheckbox label="多选框组2" :details="{ a: 2 }" shape="round" :value="2" :uu-id="2" />
          <YCheckbox label="多选框组3" :details="{ a: 3 }" shape="round" :value="3" :uu-id="3" />
        </YCheckboxGroup>
      </YFormItem>
    </YForm>
  </div>
</template>

<script setup lang="tsx">
import { watch } from "vue";
import { reactive, h, ref } from "vue";
import { CheckboxDisabledFun } from "yy-ui";

const renderContent = () => h("div", {}, "23432432dfasdf");
const a = reactive({
  num: 0,
});
setTimeout(() => {
  a.num = 6;
}, 5000);
const span = (d: any, uuId: number) => {
  console.log(d);
  console.log(uuId);
  return d.num ? 8 : 4;
};
const values = reactive({
  name: "11",
  value: "22",
  age: "",
  test: "",
});
const onSubmit = (val: any) => {
  console.log(val);
};
const show = ref(true);

setTimeout(() => {
  show.value = false;
}, 5000);
const formSpan = (details: any, uuId: string) => {
  if (uuId === "3") {
    return show.value ? 6 : 12;
  }
  return 6;
};
const checked = ref(1);
const disabled = ref(false);

setTimeout(() => {
  disabled.value = true;
}, 5000);
const disabledFn: CheckboxDisabledFun = (current, data, toggle) => {
  const { checked, uuId, details } = current;
  if (data.uuId === 3 && uuId == 1) {
    toggle(checked);
  }
};
const checkeds = reactive<number[]>([1]);
setTimeout(() => {
  // checkeds.push(1);
  console.log(2222);
}, 3000);
watch(checkeds, (val) => {
  console.log(val);
});
</script>
<style>
.item {
  height: 20px;
  background-color: var(--y-color-primary-1);
  margin-bottom: 5px;
}
.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}
.bg {
  height: 20px;
  background-color: var(--y-color-primary);
}
</style>
