<!--single-column-->

# 栅格 Grid
通过基础的 24 分栏，迅速简便地创建布局。

## 代码演示
```demo
basic.vue
gutter.vue
```

## API

### Row Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| gutter | `number` \| `array` | `0` | 栅格间隔 |  |
| align | `'top'` \| `'middle'` \| `'bottom'` | `'top'` | flex 布局下的垂直排列方式 | |
| justify | `'start'` \| `'end'` \| `'center'` \| `'space-around'` \| `'space-between'` \| `'space-evenly'` | `'start'` | flex 布局下的水平排列方式 | |
| tag | `'string'` | `'div'` | 自定义元素标签 | |

### Row Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 自定义默认内容 |

### Col Props
