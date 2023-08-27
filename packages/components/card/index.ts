import { withInstall } from "@yy/utils";
import _card from "./src/card";

export * from "./src/types";
export const YCard = withInstall(_card);
export default YCard;

declare module "vue" {
  export interface GlobalComponents {
    YCard: typeof YCard;
  }
}
