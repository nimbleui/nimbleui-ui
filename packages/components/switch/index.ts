import { withInstall } from "@yy/utils";
import _switch from "./src/switch";

export * from "./src/types";
export const YSwitch = withInstall(_switch);
export default YSwitch;

declare module "vue" {
  export interface GlobalComponents {
    YSwitch: typeof YSwitch;
  }
}
