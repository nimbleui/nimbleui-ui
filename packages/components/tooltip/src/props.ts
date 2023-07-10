import { PropType } from "vue";

export const contentProps = () => ({
  /**
   * @description 渲染在哪里
   */
  appendTo: {
    type: String,
    default: "body",
  },
  /**
   * @description 是否禁止穿梭功能
   */
  teleported: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 动画名称
   */
  transition: {
    type: String,
  },
  /**
   * @description 是否显示
   */
  show: {
    type: Boolean,
  },
  /**
   * @description 下拉框的宽度
   */
  selectWidth: {
    type: Number,
  },
  /**
   * @description 菜单配置项
   */
  menu: {
    type: Array as PropType<Array<{ [key: string]: any } | string>>,
  },
  /**
   * @description menu数组中label字段名
   */
  labelField: {
    type: String,
    default: "label",
  },
});
