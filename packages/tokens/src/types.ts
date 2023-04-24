import { ComponentInternalInstance, ComponentPublicInstance } from "vue";

export interface ChildrenItem<T = any> {
  instance: ComponentInternalInstance;
  // eslint-disable-next-line
  proxy: ComponentPublicInstance<{}, T>;
}

export interface Context<PropsValue = Record<string, any>> {
  props: PropsValue;
  children?: ChildrenItem[];
  link?: (child: ComponentInternalInstance) => void;
  unLink?: (child: ComponentInternalInstance) => void;
}

type DataType = {
  name: string;
  value: string;
};
type EventType = "onBlur" | "onChange" | "onSubmit" | "onFocus";
export type EventFun = (type: EventType, data: DataType) => void;
