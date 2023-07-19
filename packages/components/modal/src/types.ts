import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";

type DoneFn = (cancel?: boolean) => void;
type BeforeCloseFn = (done: DoneFn) => void;

const modalProps = mergeCommonProp({
  /**
   * @description 是否显示
   */
  modelValue: {
    type: Boolean,
  },
  /**
   * @description 关闭前的回调
   */
  beforeClose: {
    type: Function as PropType<BeforeCloseFn>,
  },
  /**
   * @description 是否需要遮罩层
   */
  modal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否在关闭之后将子元素全部销毁
   */
  destroyOnClose: {
    type: Boolean,
  },
  /**
   * @description 是否自动聚焦 Modal 第一个可聚焦的元素
   */
  autoFocus: {
    type: Boolean,
  },
});

export default modalProps;

export type ModalProps = ExtractPropTypes<ReturnType<typeof modalProps>>;
