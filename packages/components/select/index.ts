import { withInstall } from "@nimble-ui/utils";
import _select from "./src/select";

export * from "./src/types";
export const YSelect = withInstall(_select);
export default YSelect;

declare module "vue" {
  export interface GlobalComponents {
    YSelect: typeof YSelect;
    "y-select": typeof YSelect;
  }
}
