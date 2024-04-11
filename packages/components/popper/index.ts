import { withInstall } from "@nimble-ui/utils";
import _popper from "./src/popper";

export * from "./src/types";
export const YPopper = withInstall(_popper);
export default YPopper;

declare module "vue" {
  export interface GlobalComponents {
    YPopper: typeof YPopper;
    "y-popper": typeof YPopper;
  }
}
