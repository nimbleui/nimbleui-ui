# 滚动条 Scrollbar
用于替换浏览器原生滚动条。

## 代码演示
```demo
basic.vue
x.vue
```

## API

### Scrollbar Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |


### Scrollbar Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `(e: { scrollLeft: number, scrollTop: number }) => void`|

### Scrollbar Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 按钮的内容 |
