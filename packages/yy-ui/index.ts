import installer from "./defaults";
export * from "@nimble-ui/components";
import { useTheme } from "@nimble-ui/hooks";

export { useTheme };

useTheme();
export const install = installer.install;
export default installer;
