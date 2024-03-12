import { withInstall } from "@nimble-ui/utils";
import _number from "./src/number";

export * from "./src/types";
export const YNumber = withInstall(_number);
export default YNumber;

declare module "vue" {
  export interface GlobalComponents {
    YNumber: typeof YNumber;
    "y-number": typeof YNumber;
  }
}
