import { withInstall } from "@nimble-ui/utils";
import _drawer from "./src/drawer";

export * from "./src/types";
export const YDrawer = withInstall(_drawer);
export default YDrawer;

declare module "vue" {
  export interface GlobalComponents {
    YDrawer: typeof YDrawer;
  }
}
