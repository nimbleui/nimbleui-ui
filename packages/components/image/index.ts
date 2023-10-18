import { withInstall } from "@nimble-ui/utils";
import _image from "./src/image";

export * from "./src/types";
export const YImage = withInstall(_image);
export default YImage;

declare module "vue" {
  export interface GlobalComponents {
    YImage: typeof YImage;
    "y-image": typeof YImage;
  }
}
