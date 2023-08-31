import { withInstall } from "@nimble-ui/utils";
import button from "./src/button";

export * from "./src/types";
export const YButton = withInstall(button);
export default YButton;

declare module "vue" {
  export interface GlobalComponents {
    YButton: typeof YButton;
  }
}
