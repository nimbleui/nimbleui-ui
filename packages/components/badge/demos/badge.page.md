# 标记 Badge


## 代码演示
```demo
basic.vue
type.vue
zero.vue
max.vue
offset.vue
```
## API

### Badge Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| ---- | ---- | ------ | ---- | ---- |
| color | `string` | - | 自定义小圆点的颜色 | - |
| count | `string \| number` | - | 标记数量 | - |
| dot | `boolean` | `false` | 不展示数字，只有一个小红点 | - |
| offset | `[number, number]` | - | 设置状态点的位置偏移 | - |
| max | `number` | - | 展示的最大值 | - |
| showZero | `boolean` | `false` | 为 0 时是否显示 | - |
| hide | `boolean` | `false` | 是否隐藏 | - |
| type | `'success' \| 'error' \| 'warning' \| 'info'` | `'error'` | 类型 | - |

### Scrollbar Slots
| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | -    | 内容 |
