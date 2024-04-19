# 提示 Popper


## 代码演示
```demo
basic.vue
```
## API

### Popper Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| placement | `"top"\|"right"\|"bottom"\|"left""top-start"\|"top-end"\|"right-start \|"right-end"\|"bottom-start"\|"bottom-end"\|"left-start"\|"left-end"` | `"bottom"` | 弹出位置 | - |
| trigger | `"hover"\|"click"\|"focus"\|"contextmenu"` | `"click"` | 触发方式 | - |
| disabled | `boolean \| (details: any) => boolean` | `false` | 是否禁用 | - |
| modelValue | `boolean` | - | 控制显示隐藏 | - |
| appendTo | `string \| HTMLElement` | `'body'` | 渲染在哪里 | - |
| teleported | `boolean` | - | 是否禁止穿梭功能 | - |
| transition | `string` | - | 过度动画名称 | - |
| contentClass | `Array \| Object \| String` | - | 提示内容的class | - |
| contentStyle | `Array \| Object \| String` | - | 提示内容的style | - |

### Popper Events
| 事件名  | 说明           | 类型         |
| ------- | -------------- | ------------ |
| update:modelValue  | 显示状态改变的回调函数 | `(value: boolean) => void` |

### Popper Slots
| 名称        | 参数 | 说明                      |
| ----------- | ---- | ------------------------- |
| default     | -    | Tooltip 触发 & 引用的元素 |
| title       | -    | 确认框标题                |
| description | -    | 确认内容的详细描述        |