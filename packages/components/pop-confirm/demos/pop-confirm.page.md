# 气泡确认框 PopConfirm


## 代码演示
```demo
basic.vue
trigger.vue
async.vue
```
## API

### PopConfirm Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| cancelText | `string` | - | 取消按钮文字 | |
| disabled | `boolean` | - | 阻止点击PopConfirm子元素时弹出确认框 | |
| icon | `VNodeChild \| (() => VNodeChild)` | - | 自定义弹出气泡 Icon 图标| |
| okText | `string` | - | 确认按钮文字 | 
| okType | `string` | `'primary'` | 确认按钮类型 | |
| hideCancel | `boolean` | - | 是否隐藏取消按钮 | |
| title | `VNodeChild \| (() => VNodeChild)` | - | 确认框标题 | |
| description | `VNodeChild \| (() => VNodeChild)` | - | 确认内容的详细描述 | |
| beforeConfirm | `(done: (cancel?: boolean) => void) => void` | 确认前执行的函数，回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候。 | |

### PopConfirm Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| cancel | 点击取消的回调 | `() => void`|
| confirm | 点击确认的回调 | `() => void`|

### PopConfirm Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | Tooltip 触发 & 引用的元素 |
| title | - | 确认框标题 |
| description | - | 确认内容的详细描述 |