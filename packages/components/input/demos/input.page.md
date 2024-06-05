# 输入框 Input


## 代码演示
```demo
basic.vue
textarea.vue
```
## API

### Input Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | `boolean` | - | 输入框是否为禁用状态 | - |
| name | `string` | - | 名称，作为提交表单时的标识符 | - |
| type | `text \| password \| textarea` | `text` | 输入框类型 | - |
| modelValue | `string \| number` | `text` | 当前输入的值 | - |
| bordered | `boolean` | `true` | 是否有边框 | - |
| readonly | `boolean` | - | 是否为只读状态，只读状态下无法输入内容 | - |
| placeholder | `string` | - | 输入框占位提示文字 | - |
| maxLength | `number` | - | 原生属性，最大输入长度 | - |
| minLength | `number` | - | 原生属性，最小输入长度 | - |
| autofocus | `boolean` | - | 原生属性，自动获取焦点 | - |
| allowClear | `boolean` | - | 是否启用清除图标，点击清除图标后会清空输入框 | - |
| clearTrigger | `focus\|always` | - | 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示 | - |
| formatter | `(value: string) => string` | - | 指定输入值的格式 | - |
| parser | `(value: string) => string` | - | 指定从格式化器输入中提取的值 | - |
| prefix | `string` | - | 前缀 | - |
| suffix | `string` | - | 后缀 | - |
| rows | `number` | `2` | type为textarea才生效 | - |
| autoSize | `boolean \| { minRows: number; maxRows: number }` | - | t自适应内容高度，只适用于textarea | - |