import { withInstall } from "@nimble-ui/utils";
import _input from "./src/input";

export * from "./src/types";
export const YInput = withInstall(_input);
export default YInput;

declare module "vue" {
  export interface GlobalComponents {
    YInput: typeof YInput;
  }
}
