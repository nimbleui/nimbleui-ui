import { defineComponent } from "vue";

export default defineComponent({
  name: "ComponentDomes",
  props: {
    span: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    return () => {
      const { span } = props;
      const children = ctx.slots.default?.() ?? [];

      return (
        <div
          style={{ gridTemplateColumns: span === 1 ? "100%" : "minmax(0, 1fr) minmax(0, 1fr)" }}
          class="component-demos"
        >
          {span === 1 ? (
            children
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                  gridTemplateColumns: "100%",
                }}
              >
                {children.filter((_, index) => index % 2 === 0)}
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                  gridTemplateColumns: "100%",
                }}
              >
                {children.filter((_, index) => index % 2 === 1)}
              </div>
            </>
          )}
        </div>
      );
    };
  },
});
