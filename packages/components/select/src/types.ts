import { mergeCommonProp } from "@nimble-ui/utils";
import type { ExtractPropTypes, PropType, VNode } from "vue";

export interface SelectOptions {
  id?: string | number;
  label?: string;
  disabled?: boolean;
  renderLabel?: VNode | ((details: any) => VNode);
  [key: string]: any;
}

const selectProps = mergeCommonProp({
  /**
   * @description name唯一标识，给form收集数据
   */
  name: {
    type: String,
  },
  /**
   * @description 配置项
   */
  options: {
    type: Array as PropType<SelectOptions[]>,
  },
  /**
   * @description 禁用
   */
  disabled: {
    type: Boolean,
  },
  /**
   * @description 绑定的值
   */
  modelValue: {
    type: [String, Number],
  },
  /**
   * @description 绑定值的key
   */
  field: {
    type: String,
    default: "id",
  },
  /**
   * @description 展示的值
   */
  label: {
    type: [String, Number],
  },
  /**
   * @description 展示值的key
   */
  labelField: {
    type: String,
    default: "label",
  },
});

export default selectProps;

export type SelectProps = ExtractPropTypes<ReturnType<typeof selectProps>>;
