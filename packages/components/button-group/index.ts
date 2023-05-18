import { withInstall } from "@yy/utils";
import buttonGroup from "./src/buttonGroup";

export * from "./src/types";
export const YButtonGroup = withInstall(buttonGroup);
export default YButtonGroup;

declare module "vue" {
  export interface GlobalComponents {
    YButtonGroup: typeof YButtonGroup;
  }
}
