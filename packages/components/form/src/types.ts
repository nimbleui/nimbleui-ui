import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes, ComponentPublicInstance } from "vue";
import { rowUniqueProp } from "@yy/yy-ui";

const formProps = mergeCommonProp({
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
  ...rowUniqueProp,
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
