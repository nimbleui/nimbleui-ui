<template>
  <div>
    <YRow :details="a" justify="space-around" :gutter="8" :span="span">
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
    <YButton shape="circle">
      <div class="circle">圆</div>
    </YButton>

    <YButtonGroup>
      <YButton>1111</YButton>
      <YButton>2222</YButton>
      <YButton>3333</YButton>
    </YButtonGroup>
    {{ a.num }}

    <YForm id="form" :span="6" :gutter="8" @submit="onSubmit">
      <YFormItem>
        <YInput v-model="values.name" disabled name="name" />
      </YFormItem>
      <YFormItem :rules="{ required: true, message: '不能为空' }">
        <YInput v-model="values.value" name="value" />
      </YFormItem>
      <YFormItem :rules="{ required: true, message: '不能为空' }">
        <YInput v-model="values.age" name="age" />
      </YFormItem>
      <YFormItem v-if="show">
        <YInput v-model="values.test" name="test" />
      </YFormItem>
    </YForm>
    <YButton form="form" native-type="submit">提交</YButton>
  </div>
</template>

<script setup lang="tsx">
import { reactive, h, ref } from "vue";

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
  age: 33,
  test: "",
});
const onSubmit = (val: any) => {
  console.log(val);
};
const show = ref(true);

setTimeout(() => {
  show.value = false;
}, 5000);
setTimeout(() => {
  show.value = true;
}, 10000);
setTimeout(() => {
  show.value = false;
}, 15000);
</script>
<style>
.item {
  height: 20px;
  background-color: aliceblue;
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
