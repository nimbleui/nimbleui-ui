# 滚动条 Scrollbar
用于替换浏览器原生滚动条。

## 代码演示
```demo
basic.vue
x.vue
trigger.vue
```

## API

### Scrollbar Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| tag | `string` | `'div'` | 视图的元素标签 | |
| native | `boolean` | `false` | 是否使用原生滚动条样式 | |
| contentClass | `array \|object \|string` | - | 视图的自定义类名 | |
| contentStyle | `array \|object \|string` | - | 视图的自定义样式 | |
| xScroll | `boolean` | `false` | 是否可以横向滚动 | |
| trigger | `'hover' \| 'hide' \| 'none'` | `'none'` | 显示滚动条的时机，'none' 表示一直显示 | |
| size | `number` | `5` | 滚动条大小 | |

### Scrollbar Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `(scroll: number) => void`|

### Scrollbar Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 滚动条的内容 |
