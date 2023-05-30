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
    {{ a.num }}
    <YButton form="form" native-type="submit">提交</YButton>
    <!-- <div style="height: 1000px"></div> -->
    <YForm id="form" :span="formSpan" :details="values" scroll-to-error :gutter="10" @submit="onSubmit">
      <YFormItem disabled uu-id="1" name="name" label="名称">
        <YInput v-model="values.name" placeholder="请输入" disabled name="name" />
      </YFormItem>
      <YFormItem uu-id="2" name="value" label="内容" :rules="{ required: true, message: '不能为空' }">
        <YInput v-model="values.value" clear-trigger="always" placeholder="请输入" name="value" />
      </YFormItem>
      <YFormItem uu-id="3" name="age" label="年龄" :rules="{ required: true, message: '不能为空' }">
        <YInput v-model="values.age" placeholder="请输入" name="age" />
      </YFormItem>
      <YFormItem v-if="show" uu-id="4" name="test" label="测试">
        <YInput v-model="values.test" placeholder="请输入" name="test" />
      </YFormItem>
    </YForm>
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
