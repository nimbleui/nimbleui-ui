import { withInstall } from "@nimble-ui/utils";
import _expandTransition from "./src/expandTransition";

export * from "./src/types";
export const YExpandTransition = withInstall(_expandTransition);
export default YExpandTransition;

declare module "vue" {
  export interface GlobalComponents {
    YExpandTransition: typeof YExpandTransition;
  }
}
