import { mergeCommonProp, type Awaitable, type ContainFunction } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

export type UploadStatus = "ready" | "uploading" | "success" | "fail";
export interface UploadRawFile extends File {
  uid: number;
}
export type UploadFileItem = {
  name: string;
  percentage?: number;
  status: UploadStatus;
  size?: number;
  response?: unknown;
  uid: number;
  url?: string;
  raw?: UploadRawFile;
  [key: string]: any;
};
export type UploadFiles = UploadFileItem[];
export type UploadListType = "text" | "picture" | "picture-card";
const uploadProps = mergeCommonProp({
  /**
   * @description 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
   */
  maxCount: {
    type: Number,
  },
  /**
   * @description 是否禁用上传
   */
  disabled: {
    type: [Function, Boolean] as PropType<ContainFunction<() => boolean>>,
  },
  fileList: {
    type: Array as PropType<UploadFiles>,
    default: () => [],
  },
  name: {
    type: [String, Number],
  },
  readonly: {
    type: Boolean,
  },
  multiple: {
    type: Boolean,
  },
  accept: {
    type: String,
    default: "image/*",
  },
  uploadText: {
    type: String,
  },
  /**
   * @description 文件列表的类型
   */
  listType: {
    type: String as PropType<UploadListType>,
  },
  beforeRemove: {
    type: Function as PropType<() => Awaitable<boolean>>,
  },
});

export default uploadProps;

export type UploadProps = ExtractPropTypes<ReturnType<typeof uploadProps>>;
