import { withInstall } from "@nimble-ui/utils";
import _popConfirm from "./src/popConfirm";

export * from "./src/types";
export const YPopConfirm = withInstall(_popConfirm);
export default YPopConfirm;

declare module "vue" {
  export interface GlobalComponents {
    YPopConfirm: typeof YPopConfirm;
    "y-pop-confirm": typeof YPopConfirm;
  }
}
