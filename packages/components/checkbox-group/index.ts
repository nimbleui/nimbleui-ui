import { withInstall } from "@yy/utils";
import checkboxGroup from "./src/checkboxGroup";

export * from "./src/types";
export const YCheckboxGroup = withInstall(checkboxGroup);
export default YCheckboxGroup;

declare module "vue" {
  export interface GlobalComponents {
    YCheckboxGroup: typeof YCheckboxGroup;
  }
}
