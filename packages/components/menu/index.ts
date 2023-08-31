import { withInstall } from "@nimble-ui/utils";
import _menu from "./src/menu";

export * from "./src/types";
export const YMenu = withInstall(_menu);
export default YMenu;

declare module "vue" {
  export interface GlobalComponents {
    YMenu: typeof YMenu;
  }
}
