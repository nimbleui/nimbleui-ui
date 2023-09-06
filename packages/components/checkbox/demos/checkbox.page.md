# 复选框 Checkbox
在一组可选项中进行多项选择时

## 代码演示
```demo
basic.vue
```

## API

### Checkbox Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| modelValue \| v-model | `string` \| `boolean` \| `number` | - | 选中时绑定的值 | |
| name | `string` | - | 标识符，作为提交表单时的标识符 | |
| labelPosition | `'left'` \| `'right'` | `'right'` | 文本位置 | |
| shape | `'square'` \| `'round'` | `'square'` | 形状 | |
| disabled | `boolean` | `false` | 是否禁用 | |
| label | `string` | - | 标签说明 | |
| value | `string` \| `number` | - | 选中时的值 | | 


### Checkbox Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| update:modelValue | 选项组的值改变时的回调 | `(value: string \| number \| boolean) => void`|
| change | 当绑定值变化时触发的事件 | `(value: string \| number \| boolean) => void` |

### Checkbox Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 自定义默认内容 |