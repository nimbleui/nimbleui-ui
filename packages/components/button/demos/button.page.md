# 按钮 Button
按钮用于开始一个即时操作。

## 代码演示
```demo
basic.vue
disabled.vue
group.vue
loading.vue
```

## API

### Button Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| attr-type | `'button'` \| `'submit'`\| `'reset'` \| `'button'` | `'button'` | 按钮的 DOM 的 `type` 属性 |  |
| block | `boolean` | `false` | 按钮是否显示为块级 |  |
| bordered | `boolean` | `true` | 按钮是否显示 border |  |
| circle | `boolean` | `false` | 按钮是否为圆形 |  |
| dashed | `boolean` | `false` | 按钮边框是否为虚线 |  |
| disabled | `boolean` | `false` | 按钮是否禁用 |  |
| keyboard | `boolean` | `true` | 是否支持键盘操作 |  |
| loading | `boolean` | `false` | 按钮是否显示加载状态 |  |
| round | `boolean` | `false` | 按钮是否显示圆角 |  |
| content | `(details) => VNodeChild` \| `string` | |按钮的显示内容 | |
| size | `'small'` \| `'medium'` \| `'large'` \| `'medium'` | `'medium'` |按钮的尺寸  |  |

### Button Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| click | 点击按钮事件 | `(e: Event) => void`|

### Button Slots
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 按钮的内容 |
