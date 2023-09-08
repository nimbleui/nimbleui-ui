# 间距 Space

设置组件之间的间距。

```demo
basic.vue
vertical.vue
justify.vue
size.vue
```

## API

### Space Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| align | `'start'` \| `'end'` \| `'center'` \| `'baseline'` | `'start'` | 对齐方式 | |
| justify | `'start'` \| `'end'` \| `'center'` \| `'space-around'` \| `'space-between'` \| `'space-evenly'` | `'start'` | 水平排列方式 | |
| size | `number` \| `[number, number]` | `8` | 间距大小 | |
| vertical | `boolean` | `false` | 是否垂直布局 | |
| wrap | `boolean` | `true` | 是否超出换行 | |
| split | `string` \| `VNode` | - | 间隔符 | |
| inline | `boolean` | `false` | 是否为行内元素 | |

### Space Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 间距的内容 |