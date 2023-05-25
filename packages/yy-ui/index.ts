import installer from "./defaults";
export * from "@yy/components";
import "@yy/theme";
import { useTheme } from "@yy/hooks";

export { useTheme };

useTheme();
export const install = installer.install;
export default installer;
