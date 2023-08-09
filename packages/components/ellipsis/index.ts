import { withInstall } from "@yy/utils";
import _ellipsis from "./src/ellipsis";

export * from "./src/types";
export const YEllipsis = withInstall(_ellipsis);
export default YEllipsis;

declare module "vue" {
  export interface GlobalComponents {
    YEllipsis: typeof YEllipsis;
  }
}