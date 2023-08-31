import type { PropType, ExtractPropTypes } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

type Direction = "horizontal" | "vertical";

type Obj = { [key: string | number]: Array<string | number> };
export type CheckboxFunParam = {
  value: number | string;
  uuId: string | number;
  label: any;
  checked: boolean;
  details: any;
};

export type CheckboxDisabledFun = (
  clickCurrent: CheckboxFunParam,
  current: Omit<CheckboxFunParam, "checked">,
  toggle: (bool: boolean) => void
) => void;

const checkboxGroupProps = mergeCommonProp({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Array as PropType<Array<string | number>>,
  },
  /**
   * @description 排列方向
   */
  direction: {
    type: String as PropType<Direction>,
    default: "vertical",
  },
  /**
   * @description 是否禁用复选框，如果是boolean：禁用所有，如果是对象：根据key禁用指定的，如果是方法：根据执行的结果禁用
   */
  disabled: {
    type: [Boolean, Object, Function] as PropType<Obj | CheckboxDisabledFun | boolean>,
  },
  /**
   * @description 名称，作为提交表单时的标识符
   */
  name: String,
});

export default checkboxGroupProps;
export type CheckboxGroupProps = ExtractPropTypes<ReturnType<typeof checkboxGroupProps>>;
