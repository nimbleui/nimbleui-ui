import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

export type ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";
export type UploadStatus = "ready" | "uploading" | "success" | "fail";
export interface UploadRawFile extends File {
  uid: number;
}
export type UploaderItem = {
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
export type UploadFiles = UploaderItem[];
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
  disabled: Boolean,
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
});

export default uploadProps;

export type UploadProps = ExtractPropTypes<ReturnType<typeof uploadProps>>;
