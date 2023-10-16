import { withInstall } from "@nimble-ui/utils";
import _flex from "./src/flex";

export * from "./src/types";
export const YFlex = withInstall(_flex);
export default YFlex;

declare module "vue" {
  export interface GlobalComponents {
    YFlex: typeof YFlex;
    "y-flex": typeof YFlex;
  }
}
