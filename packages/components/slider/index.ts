import { withInstall } from "@nimble-ui/utils";
import _slider from "./src/slider";

export * from "./src/types";
export const YSlider = withInstall(_slider);
export default YSlider;

declare module "vue" {
  export interface GlobalComponents {
    YSlider: typeof YSlider;
    "y-slider": typeof YSlider;
  }
}
