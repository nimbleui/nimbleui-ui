import { withInstall } from "@yy/utils";
import _overlay from "./src/overlay";

export * from "./src/types";
export const YOverlay = withInstall(_overlay);
export default YOverlay;

declare module "vue" {
  export interface GlobalComponents {
    YOverlay: typeof YOverlay;
  }
}
