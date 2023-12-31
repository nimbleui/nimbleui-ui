import { App } from "vue";

export type WithInstall<T> = T & {
  install(app: App): void;
};

export function withInstall<T>(component: T) {
  (component as Record<string, unknown>).install = (app: App) => {
    const { name } = component as unknown as { name: string };
    app.component(name, component as any);
  };

  return component as WithInstall<T>;
}

export function withInstallFunction<T>(component: T, name: string) {
  (component as Record<string, unknown>).install = (app: App) => {
    app.config.globalProperties[name] = component;
  };

  return component as WithInstall<T>;
}
