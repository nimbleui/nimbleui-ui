import { withInstall } from "@nimble-ui/utils";
import _radioGroup from "./src/radioGroup";

export * from "./src/types";
export const YRadioGroup = withInstall(_radioGroup);
export default YRadioGroup;

declare module "vue" {
  export interface GlobalComponents {
    YRadioGroup: typeof YRadioGroup;
    "y-radio-group": typeof YRadioGroup;
  }
}
