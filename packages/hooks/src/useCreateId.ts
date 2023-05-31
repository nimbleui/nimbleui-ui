import { getCurrentInstance, computed } from "vue";

const count = Math.floor(Math.random() * 10000);
let current = 0;

export function useCreateId() {
  const instance = getCurrentInstance();

  return {
    id: computed<string>(() => {
      return (instance?.props.id ?? `y-id-${count}-${instance?.uid || current++}`) as string;
    }),
  };
}
