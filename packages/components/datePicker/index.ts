import { withInstall } from "@nimble-ui/utils";
import _datePicker from "./src/datePicker";

export * from "./src/types";
export const YDatePicker = withInstall(_datePicker);
export default YDatePicker;

declare module "vue" {
  export interface GlobalComponents {
    YDatePicker: typeof YDatePicker;
    "y-date-picker": typeof YDatePicker;
  }
}
