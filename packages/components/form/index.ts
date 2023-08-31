import { withInstall } from "@nimble-ui/utils";
import form from "./src/form";

export * from "./src/types";
export const YForm = withInstall(form);
export default YForm;

declare module "vue" {
  export interface GlobalComponents {
    YForm: typeof YForm;
  }
}
