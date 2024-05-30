import { withInstall } from "@nimble-ui/utils";
import _timePicker from "./src/timePicker";

export * from "./src/types";
export const YTimePicker = withInstall(_timePicker);
export default YTimePicker;

declare module "vue" {
  export interface GlobalComponents {
    YTimePicker: typeof YTimePicker;
    "y-time-picker": typeof YTimePicker;
  }
}
