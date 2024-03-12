# 标签页 Tabs


## 代码演示
```demo
basic.vue
card.vue
centered.vue
trigger.vue
vertical.vue
scroll.vue
```
## API

### Tabs Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| modelValue | `string \| number` | - | 绑定值，tabs参数中的 idField值，默认是id | |
| items | `Array` | - | 配置选项卡内容 | |
| labelField | `string` | `'label'` | 选项 label 的字段名 | |
| keyField | `string` | `'id'` | 选项 key 的字段名，默认是id | |
| trigger | `'click' \| 'hover'` | `'click'` | 触发的方式 | |
| renderTabBar | `function` | - | 替换默认TabBar | | 
| centered | `Boolean` | `false` | 标签居中展示 | |
| type | `'line' \| 'card' \| 'radio' \| "bar"` | `'line'` | 页签的基本样式 | |
| tabPosition | `'left' \| 'top' \| 'right' \| "bottom"` | `'top'` | 页签位置 | |

### Switch Events
| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 改变时触发 | `(val: string \| number) => void` |
| click | tab 被选中时触发 | `(item: object, e: Event) => void` |