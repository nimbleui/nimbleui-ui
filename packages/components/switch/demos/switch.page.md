# 开关 Switch
开关选择器。

## 代码演示
```demo
basic.vue
text.vue
disabled.vue
loading.vue
customValue.vue
```

## API

### Switch Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| modelValue \| v-model | `string \| number \| boolean` | `false` | 开关选中状态 | |
| disabled | `boolean` | `false` | 是否禁用 | |
| loading | `boolean` | `false` | 是否加载 | |
| checkedValue | `string \| number \| boolean` | `true` | 打开时对应的值 | |
| uncheckedValue | `string \| number \| boolean` | `false` | 关闭时对应的值 | |
| checkedText | `string` | - | 打开时的文字描述 | |
| uncheckedText | `string` | - | 关闭时的文字描述 | |

### Switch Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 状态发生变化时的回调函数 | `(val: boolean \| string \| number) => void` |

### Switch Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| checked | - | 打开时的文字描述 |
| unchecked | - | 关闭时的文字描述 |
