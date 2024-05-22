# 对话框 Modal
常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。支持组件调用和函数调用两种方式。

## 代码演示
```demo
basic.vue
function.vue
```

## API

### Modal Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| ---- | ---- | ------ | ---- | ---- |
| modelValue | `boolean` | `false` | 是否显示 | - |
| beforeClose | `(done: DoneFn, type: ModalAction) => void` | - | 最大宽度 | - |
| modal | `boolean` | `false` | 是否需要遮罩层 | - |
| destroyOnClose | `boolean` | - | 是否在关闭之后将子元素全部销毁 | - |
| autoFocus | `boolean` | - | 是否自动聚焦 Modal 第一个可聚焦的元素 | - |
| zIndex | `number` | - | 层级 | - |
| content | `string \| VNode \| (details) => VNode ` | - | 显示内容，优先级高级default插槽 | - |
| appendTo | `string \| element` | `'body'` | 插入在哪 | - |
| confirmText | `string` | `'确定'` | 确定按钮的文案 | - |
| confirmType | `ButtonTypes` | `'primary'` | 确定按钮的类型 | - |
| cancelText | `string` | `'取消'` | 取消按钮的文案 | - |
| cancelType | `ButtonTypes` | `'info'` | 取消按钮的类型 | - |
| hideCancel | `boolean` | - | 是否隐藏取消按钮 | - |
| hideConfirm | `boolean` | - | 是否隐藏确定按钮 | - |
| disabled | `boolean` | - | 禁止穿梭 | - |
| contentStyle | `array \| object \| string` | - | 提示内容的style | - |

### Switch Events
| 事件名 | 说明 | 类型 |
| ----- | ---- | ----- |
| confirm | 确定 | `() => void` |
| close | 取消 | `() => void` |
| destroy | 销毁 | `() => void` |
| update:modelValue | 显示隐藏 | `(val: boolean) => void` |

### Modal Slots
| 名称    | 参数 | 说明           |
| ------- | ---- | -------------- |
| default | - | 显示内容 |
| buttons | - | 按钮   |
