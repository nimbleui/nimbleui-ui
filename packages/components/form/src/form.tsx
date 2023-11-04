import { defineComponent } from "vue";
import { formContextKey } from "@nimble-ui/tokens";
import { useChildren } from "@nimble-ui/hooks";

import formProps from "./types";

export default defineComponent({
  name: "YForm",
  props: formProps(),
  emits: ["submit", "failed"],
  setup(props, ctx) {
    const { linkChildren, children } = useChildren(formContextKey);
    linkChildren({ props });

    const getFieldsByNames = (names?: string[]) => {
      if (names) {
        return children.filter((child) => names.includes(child.public.name));
      }
      return children;
    };

    const scrollToError = (name: string) => {
      children.some((child) => {
        if (child.public.name === name) {
          child.public.$el.scrollIntoView();
        }
      });
    };

    const validateAll = (names?: string[]) => {
      return new Promise<void>((resolve, reject) => {
        const items = getFieldsByNames(names);

        Promise.all(items.map((item) => item.public.validate())).then((result) => {
          result = result.filter(Boolean);
          if (result.length) {
            reject(result);
          } else {
            resolve();
          }
        });
      });
    };

    const validate = (name?: string | string[]) => {
      if (typeof name === "string") {
        const matched = children.find((item) => item.public.name === name);
        return new Promise<void>((resolve, reject) => {
          matched?.public.validate().then((error?: any) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }
      return validateAll(name);
    };

    // 获取所有form组件的value
    const getValues = () => {
      return children.reduce<Record<string, unknown>>((acc, child) => {
        const proxy = child.public;
        if (proxy?.inputPublic && proxy.inputPublic.value) {
          const { name, value } = proxy.inputPublic.value;
          acc[name] = value;
        }
        return acc;
      }, {});
    };

    const submit = () => {
      const values = getValues();
      validate()
        .then(() => ctx.emit("submit", values))
        .catch((errors) => {
          ctx.emit("failed", { values, errors });

          if (props.scrollToError && errors[0].name) {
            scrollToError(errors[0].name);
          }
        });
    };
    const onSubmit = (event: Event) => {
      event.preventDefault();
      submit();
    };

    return () => {
      const { details } = props;
      return <form onSubmit={onSubmit}>{ctx.slots.default?.({ details })}</form>;
    };
  },
});
