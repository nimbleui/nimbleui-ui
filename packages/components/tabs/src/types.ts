import { mergeCommonProp } from "@nimble-ui/utils";
import type { ExtractPropTypes, PropType, VNodeChild } from "vue";

export interface TabItemType {
  label?: VNodeChild;
  disabled?: boolean | (() => boolean);
  children?: VNodeChild | (() => VNodeChild);
  closable?: boolean;
  [key: string]: unknown;
}

export type TabsType = "line" | "card";

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
   * @description 替换默认TabBar
   */
  renderTabBar: {
    type: Function as PropType<(item: TabItemType) => VNodeChild>,
  },
  /**
   * @description 标签居中展示
   */
  centered: {
    type: Boolean,
  },
  type: {
    type: String as PropType<TabsType>,
  },
});

export default tabsProps;

export type TabsProps = ExtractPropTypes<ReturnType<typeof tabsProps>>;
