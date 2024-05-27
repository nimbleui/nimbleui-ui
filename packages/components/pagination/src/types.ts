import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

const paginationProps = mergeCommonProp({
  /**
   * @description 绑定当前页码
   */
  modelValue: {
    type: Number,
    default: 1,
  },
  /**
   * @description 数据总数
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * @description 每页条数
   */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**
   * @description 大小
   */
  size: {
    type: String as PropType<"default" | "small">,
  },
  /**
   * @description 由于分页长度，如果传入的是偶数加一变成奇数，
   */
  pageSlot: {
    type: Number,
    default: 9,
  },
  /**
   * @description 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
   */
  onChange: {
    type: Function as PropType<(page: number, pageSize: number) => void>,
  },
  "onUpdate:modelValue": {
    type: Function as PropType<(page: number) => void>,
  },
});

export default paginationProps;

export type PaginationProps = ExtractPropTypes<ReturnType<typeof paginationProps>>;
