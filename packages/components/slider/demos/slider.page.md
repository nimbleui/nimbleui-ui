# 滑动输入条 Slider
滑动型输入器，展示当前值和可选范围。

## 代码演示
```demo
basic.vue
```
## API

### Slider Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| modelValue/v-mode| `number\|number[]` | - | 选中项绑定值 | |
| min | `number` | `0` | 最小值 | |
| max | `number` | `100` | 最大值 | |
| step | `number` | `1` | 步长 | |
| vertical | `boolean` | `false` | 垂直模式 | |
| marks | `{ [key: number]: VNodeChild \| (() => VNodeChild) }` | - | slider上的标记 | |
| formatTooltip | `(value: number) => VNodeChild` | - | 格式化tooltip | |
| showTooltip | `boolean` | `false` | 是否一直显示tooltip | |

### Slider Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 滑动时触发事件 | `(value: number\| number[]) => void`|

### Slider Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| thumb | - | 滑块按钮的内容 |
