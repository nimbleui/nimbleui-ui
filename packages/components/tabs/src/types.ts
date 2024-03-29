import { mergeCommonProp } from "@nimble-ui/utils";
import type { ExtractPropTypes, PropType, VNodeChild } from "vue";

export interface TabItemType {
  label?: VNodeChild;
  disabled?: boolean | ((details: any) => boolean);
  children?: VNodeChild | ((item: TabItemType, details: any) => VNodeChild);
  closable?: boolean;
  [key: string]: unknown;
}

export type TabsType = "line" | "card" | "bar" | "editable-card";
export type TabPosition = "left" | "top" | "right" | "bottom";

const tabsProps = mergeCommonProp({
  /**
   * @description 绑定值，tabs参数中的 idField值，默认是id
   */
  modelValue: {
    type: [Number, String],
  },
  /**
   * @description 配置选项卡内容
   */
  items: {
    type: Array as PropType<TabItemType[]>,
  },
  /**
   * @description 选项 label 的字段名
   */
  labelField: {
    type: String,
    default: "label",
  },
  /**
   * @description 选项 key 的字段名，默认是id
   */
  keyField: {
    type: String,
    default: "id",
  },
  /**
   * @description 触发的方式
   */
  trigger: {
    type: String as PropType<"click" | "hover">,
    default: "click",
  },
  /**
   * @description 替换默认TabBar，如果返回false、undefined，渲染默认
   */
  renderTabBar: {
    type: Function as PropType<(item: TabItemType, details: any) => VNodeChild | void | false>,
  },
  /**
   * @description 标签居中展示
   */
  centered: {
    type: Boolean,
  },
  /**
   * @description 页签的基本样式
   */
  type: {
    type: String as PropType<TabsType>,
    default: "line",
  },
  /**
   * @description 页签位置
   */
  tabPosition: {
    type: String as PropType<TabPosition>,
    default: "top",
  },
});

export default tabsProps;

export type TabsProps = ExtractPropTypes<ReturnType<typeof tabsProps>>;
