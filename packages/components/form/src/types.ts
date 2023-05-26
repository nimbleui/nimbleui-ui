import { ExtractPropTypes, ComponentPublicInstance } from "vue";
import { rowUniqueProp } from "@yy/components/row";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";

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
    type: String,
  },
  /**
   * @description 是否为禁用状态
   */
  disabled: mergeFunctionProp<boolean>(Boolean),
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
