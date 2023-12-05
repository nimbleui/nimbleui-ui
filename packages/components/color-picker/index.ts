import { withInstall } from "@nimble-ui/utils";
import _colorPicker from "./src/colorPicker";

export * from "./src/types";
export const YColorPicker = withInstall(_colorPicker);
export default YColorPicker;

declare module "vue" {
  export interface GlobalComponents {
    YColorPicker: typeof YColorPicker;
    "y-color-picker": typeof YColorPicker;
  }
}
