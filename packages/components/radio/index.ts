import { withInstall } from "@nimble-ui/utils";
import _radio from "./src/radio";

export * from "./src/types";
export const YRadio = withInstall(_radio);
export default YRadio;

declare module "vue" {
  export interface GlobalComponents {
    YRadio: typeof YRadio;
    "y-radio": typeof YRadio;
  }
}
