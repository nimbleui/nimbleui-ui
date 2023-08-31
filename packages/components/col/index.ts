import { withInstall } from "@nimble-ui/utils";
import col from "./src/col";

export * from "./src/types";
export const YCol = withInstall(col);
export default YCol;

declare module "vue" {
  export interface GlobalComponents {
    YCol: typeof YCol;
  }
}
