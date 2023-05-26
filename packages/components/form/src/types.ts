import { ExtractPropTypes, ComponentPublicInstance, PropType } from "vue";
import { rowUniqueProp } from "@yy/components/row";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";
import { TriggerEventType, Rules } from "@yy/tokens";

const formProps = mergeCommonProp({
  // row组件的参数
  ...rowUniqueProp,
  /**
   * @description 是否在提交表单且校验不通过时滚动至错误的表单项
   */
  scrollToError: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 表单校验触发时机
   */
  validateTrigger: {
    type: [String, Array] as PropType<TriggerEventType | TriggerEventType[]>,
  },
  /**
   * @description 是否为禁用状态
   */
  disabled: mergeFunctionProp<boolean>(Boolean),
  /**
   * @description 表单校验规则
   */
  rules: {
    type: Object as PropType<{ [key: string]: Rules }>,
  },
});

export default formProps;

export type FormExpose = {
  submit: () => void;
  getValues: () => Record<string, unknown>;
  validate: (name?: string | string[] | undefined) => Promise<void>;
  resetValidation: (name?: string | string[] | undefined) => void;
};

export type FormProps = ExtractPropTypes<ReturnType<typeof formProps>>;
export type FormInstance = ComponentPublicInstance<FormProps, FormExpose>;
