import { withInstall } from "@nimble-ui/utils";
import _space from "./src/space";

export * from "./src/types";
export const YSpace = withInstall(_space);
export default YSpace;

declare module "vue" {
  export interface GlobalComponents {
    YSpace: typeof YSpace;
  }
}
