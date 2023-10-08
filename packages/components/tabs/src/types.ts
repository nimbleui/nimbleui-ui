import { mergeCommonProp } from "@nimble-ui/utils";
import type { ExtractPropTypes, PropType, VNodeChild } from "vue";

export interface TabItemType {
  disabled?: boolean | (() => boolean);
  label?: VNodeChild | (() => VNodeChild);
  [key: string]: unknown;
}

const tabsProps = mergeCommonProp({
  /**
   * @description 配置选项卡内容
   */
  items: {
    type: Array as PropType<TabItemType[]>,
  },
  labelField: {
    type: String,
    default: "label",
  },
  keyField: {
    type: String,
    default: "id",
  },
});

export default tabsProps;

export type TabsProps = ExtractPropTypes<ReturnType<typeof tabsProps>>;
