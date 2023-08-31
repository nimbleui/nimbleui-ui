import { withInstall } from "@nimble-ui/utils";
import _tooltip from "./src/tooltip";

export * from "./src/types";
export const YTooltip = withInstall(_tooltip);
export default YTooltip;

declare module "vue" {
  export interface GlobalComponents {
    YTooltip: typeof YTooltip;
  }
}
