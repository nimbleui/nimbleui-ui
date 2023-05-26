import { ComponentInternalInstance, ComponentPublicInstance } from "vue";

export type TriggerEventType = "onBlur" | "onChange" | "onSubmit" | "onFocus";

export type ChildrenType<T = any> = {
  public: ComponentPublicInstance<T, any>;
  internal: ComponentInternalInstance;
};

export type ProvideContext<T> = T & {
  children: ChildrenType[];
  link: (child: ComponentInternalInstance | null) => void;
  unlink: (child: ComponentInternalInstance | null) => void;
};
