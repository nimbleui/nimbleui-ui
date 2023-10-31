import { withInstall } from "@nimble-ui/utils";
import _upload from "./src/upload";

export * from "./src/types";
export const YUpload = withInstall(_upload);
export default YUpload;

declare module "vue" {
  export interface GlobalComponents {
    YUpload: typeof YUpload;
    "y-upload": typeof YUpload;
  }
}
