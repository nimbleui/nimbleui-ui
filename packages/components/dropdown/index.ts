import { withInstall } from "@nimble-ui/utils";
import _dropdown from "./src/dropdown";

export * from "./src/types";
export const YDropdown = withInstall(_dropdown);
export default YDropdown;

declare module "vue" {
  export interface GlobalComponents {
    YDropdown: typeof YDropdown;
  }
}
