export const contentProps = () => ({
  /**
   * @description 渲染在哪里
   */
  appendTo: {
    type: String,
  },
  /**
   * @description 是否禁止穿梭功能
   */
  teleported: {
    type: Boolean,
    default: true,
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
    default: 350,
  },
});
