import { withInstall } from "@nimble-ui/utils";
import _tabs from "./src/tabs";

export * from "./src/types";
export const YTabs = withInstall(_tabs);
export default YTabs;

declare module "vue" {
  export interface GlobalComponents {
    YTabs: typeof YTabs;
    "y-tabs": typeof YTabs;
  }
}
