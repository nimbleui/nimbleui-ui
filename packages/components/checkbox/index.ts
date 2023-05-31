import { withInstall } from "@yy/utils";
import checkbox from "./src/checkbox";

export * from "./src/types";
export const YCheckbox = withInstall(checkbox);
export default YCheckbox;

declare module "vue" {
  export interface GlobalComponents {
    YCheckbox: typeof YCheckbox;
  }
}
