import { withInstall } from "@yy/utils";
import formItem from "./src/formItem";

export * from "./src/types";
export const YFormItem = withInstall(formItem);
export default YFormItem;

declare module "vue" {
  export interface GlobalComponents {
    YFormItem: typeof YFormItem;
  }
}
