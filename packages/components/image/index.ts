import { withInstall } from "@yy/utils";
import _image from "./src/image";

export * from "./src/types";
export const YImage = withInstall(_image);
export default YImage;

declare module "vue" {
  export interface GlobalComponents {
    YImage: typeof YImage;
  }
}
