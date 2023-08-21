import { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob("../../../packages/components/**/*.page.md");

const keys = Object.keys(modules);

function camelCase(s: string) {
  const shouldConvert = !(s.indexOf("-") === -1 && s.indexOf("_") === -1 && s.indexOf(".") === -1);
  return shouldConvert ? s.replace(/[-_.]+([^-_.])/g, (...args) => args[1].toUpperCase()) : s;
}

export default keys.map((key) => {
  const list = key.split("/");
  const len = list.length;
  const name = camelCase(list[len - 1].split(".")[0]);
  const route = {
    name,
    path: `${name}`,
    component: modules[key],
  };
  return route as unknown as RouteRecordRaw;
});
