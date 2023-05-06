import installer from "./defaults";
export * from "@yy/components";
import "@yy/theme";
import { useTheme } from "@yy/hooks";
useTheme();
export const install = installer.install;
export default installer;
