import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes } from "vue";

const imagePreviewProps = mergeCommonProp({
  isGroup: {
    type: Boolean,
  },
});

export default imagePreviewProps;

export type imagePreviewExpose = {
  toggle: (bool: boolean) => void;
  setPreviewSrc: (src: string) => void;
};

export type ImagePreviewProps = ExtractPropTypes<ReturnType<typeof imagePreviewProps>>;
