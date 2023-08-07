import { withInstall } from "@yy/utils";
import _imagePreview from "./src/imagePreview";

export * from "./src/types";
export const YImagePreview = withInstall(_imagePreview);
export default YImagePreview;

declare module "vue" {
  export interface GlobalComponents {
    YImagePreview: typeof YImagePreview;
  }
}
