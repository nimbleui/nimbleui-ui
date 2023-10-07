import { withInstall } from "@nimble-ui/utils";
import _backTop from "./src/backTop";

export * from "./src/types";
export const YBackTop = withInstall(_backTop);
export default YBackTop;

declare module "vue" {
  export interface GlobalComponents {
    YBackTop: typeof YBackTop;
    "y-back-top": typeof YBackTop;
  }
}
