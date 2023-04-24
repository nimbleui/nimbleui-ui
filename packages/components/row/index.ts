import { withInstall } from "@yy/utils";
import row from "./src/row";

export * from "./src/types";
export const YRow = withInstall(row);
export default YRow;

declare module "vue" {
  export interface GlobalComponents {
    YRow: typeof YRow;
  }
}
