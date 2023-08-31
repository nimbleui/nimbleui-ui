import { ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

type Direction = "rtl" | "ltr" | "ttb" | "btt";

type DoneFn = (cancel?: boolean) => void;
type BeforeCloseFn = (done: DoneFn) => void;

const drawerProps = mergeCommonProp({
  /**
   * @description 是否显示
   */
  modelValue: {
    type: Boolean,
  },
  /**
   * @description 打开的方向
   */
  direction: {
    type: String as PropType<Direction>,
    default: "rtl",
  },
  /**
   * @description 窗体的大小
   */
  size: {
    type: [String, Number],
    default: "30%",
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
});

export default drawerProps;

export type DrawerProps = ExtractPropTypes<ReturnType<typeof drawerProps>>;
