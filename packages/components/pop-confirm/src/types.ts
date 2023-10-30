import { mergeCommonProp, makeChildProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";
import { ButtonTypes } from "@nimble-ui/components/button";

type DoneFn = (cancel?: boolean) => void;
type BeforeConfirmFn = (done: DoneFn) => void;
const popConfirmProps = mergeCommonProp({
  /**
   * @description 取消按钮文字
   */
  cancelText: String,
  /**
   * @description 阻止点击PopConfirm子元素时弹出确认框
   */
  disabled: Boolean,
  /**
   * @description 自定义弹出气泡 Icon 图标
   */
  icon: makeChildProp(),
  /**
   * @description 确认按钮文字
   */
  okText: String,
  /**
   * @description 确认按钮类型
   */
  okType: {
    type: String as PropType<ButtonTypes>,
  },
  /**
   * @description 是否隐藏取消按钮
   */
  hideCancel: Boolean,
  /**
   * @description 确认框标题
   */
  title: makeChildProp(),
  /**
   * @description 确认内容的详细描述
   */
  description: makeChildProp(),
  /**
   * @description 确认前执行的函数，回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候。
   */
  beforeConfirm: {
    type: Function as PropType<BeforeConfirmFn>,
  },
});

export default popConfirmProps;

export type PopConfirmProps = ExtractPropTypes<ReturnType<typeof popConfirmProps>>;
