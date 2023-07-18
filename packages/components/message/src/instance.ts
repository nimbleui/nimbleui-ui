import { shallowReactive } from "vue";
import { MessageInstance } from "./types";

export const instances = shallowReactive<MessageInstance[]>([]);

export const getInstance = (id: string) => {
  const index = instances.findIndex((instance) => instance.id === id);
  const current = instances[index];
  let prev: MessageInstance | undefined;
  if (index > 0) {
    prev = instances[index - 1];
  }
  return { current, prev };
};

export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;
  const exposed = prev.vm.exposed;
  if (!exposed) return 0;
  return exposed.bottom.value;
};

export const getOffsetOrSpace = (id: string, offset: number) => {
  const index = instances.findIndex((instance) => instance.id === id);
  return index > 0 ? 16 : offset;
};
