import { withInstall } from "@nimble-ui/utils";
import _modal from "./src/modal";

export * from "./src/types";
export * from "./src/function-method";
export const YModal = withInstall(_modal);
export default YModal;

declare module "vue" {
  export interface GlobalComponents {
    YModal: typeof YModal;
  }
}
