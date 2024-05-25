import { withInstall } from "@nimble-ui/utils";
import _pagination from "./src/pagination";

export * from "./src/types";
export const YPagination = withInstall(_pagination);
export default YPagination;

declare module "vue" {
  export interface GlobalComponents {
    YPagination: typeof YPagination;
    "y-pagination": typeof YPagination;
  }
}
