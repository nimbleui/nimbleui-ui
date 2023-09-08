import { withInstall } from "@nimble-ui/utils";
import _divider from "./src/divider";

export * from "./src/types";
export const YDivider = withInstall(_divider);
export default YDivider;

declare module "vue" {
  export interface GlobalComponents {
    YDivider: typeof YDivider;
  }
}
