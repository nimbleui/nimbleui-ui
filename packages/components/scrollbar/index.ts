import { withInstall } from "@yy/utils";
import _scrollbar from "./src/scrollbar";

export * from "./src/types";
export const YScrollbar = withInstall(_scrollbar);
export default YScrollbar;

declare module "vue" {
  export interface GlobalComponents {
    YScrollbar: typeof YScrollbar;
  }
}
