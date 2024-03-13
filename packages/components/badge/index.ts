import { withInstall } from "@nimble-ui/utils";
import _badge from "./src/badge";

export * from "./src/types";
export const YBadge = withInstall(_badge);
export default YBadge;

declare module "vue" {
  export interface GlobalComponents {
    YBadge: typeof YBadge;
    "y-badge": typeof YBadge;
  }
}
