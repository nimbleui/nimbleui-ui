import installer from "./defaults";
export * from "@yy/components";
import "@yy/theme";
import { useTheme } from "@yy/hooks";
useTheme({
  theme: "#000000",
});
export const install = installer.install;
export default installer;
