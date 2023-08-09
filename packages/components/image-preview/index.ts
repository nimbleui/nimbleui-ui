import { withInstall } from "@yy/utils";
import _imagePreview from "./src/imagePreview";

export * from "./src/types";
export * from "./src/function-method";
export const YImagePreview = withInstall(_imagePreview);
export default YImagePreview;

declare module "vue" {
  export interface GlobalComponents {
    YImagePreview: typeof YImagePreview;
  }
}
