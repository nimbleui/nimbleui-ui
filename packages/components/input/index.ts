import { withInstall } from "@nimble-ui/utils";
import input from "./src/input";

export * from "./src/types";
export const YInput = withInstall(input);
export default YInput;

declare module "vue" {
  export interface GlobalComponents {
    YInput: typeof YInput;
  }
}
