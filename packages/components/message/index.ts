import { withInstallFunction } from "@yy/utils";
import _message from "./src/function-method";

export * from "./src/types";
export const YMessage = withInstallFunction(_message, "$message");
export default YMessage;
