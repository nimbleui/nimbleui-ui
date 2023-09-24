import { withInstall } from "@nimble-ui/utils";
import _layout from "./src/layout";
import _header from "./src/header";
import _sidebar from "./src/sidebar";
import _content from "./src/content";
import _footer from "./src/footer";

export * from "./src/types";
export const YLayout = withInstall(_layout);
export const YHeader = withInstall(_header);
export const YSidebar = withInstall(_sidebar);
export const YContent = withInstall(_content);
export const YFooter = withInstall(_footer);
export default YLayout;

declare module "vue" {
  export interface GlobalComponents {
    YLayout: typeof YLayout;
    YHeader: typeof YHeader;
    YSidebar: typeof YSidebar;
    YContent: typeof YContent;
    YFooter: typeof YFooter;
  }
}
