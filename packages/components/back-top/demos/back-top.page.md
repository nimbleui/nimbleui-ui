# 回到顶部 BackTop

## 代码演示
```demo
basic.vue
position.vue
target.vue
```
## API

### BackTop Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bottom | `string \| number` | `40` | 距离页面底部的高度 |  |
| right | `string \| number` | `40` | 距离页面右侧的宽度 |  |
| listenTo | `string \| HTMLElement` | `40` | 监听滚动的元素，如果为 undefined 会监听距离最近的一个可滚动的祖先节点 |  |
| mount | `string \| HTMLElement` | `40` | 渲染的容器节点 |  |
| scrollTop | `number` | `180` | 滚动时触发显示回到顶部的高度 |  |

### BackTop Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 回到顶部的内容 |
