import { render, waitFor, fireEvent } from "@testing-library/vue";
import ElementPlus from "element-plus";

import Nav from "./Nav.vue";

describe("Nav", () => {
  it("should show all nav items", async () => {
    const { getByText } = render(Nav, {
      global: {
        plugins: [ElementPlus],
      },
      props: {
        items: ["nav-test-a", "nav-test-b", "nav-test-c"],
      },
    });

    await waitFor(() => {
      getByText("nav-test-a");
      getByText("nav-test-b");
      getByText("nav-test-c");
    });
  });

  it("should properly handles v-model", async () => {
    const { getByText, emitted } = render(Nav, {
      global: {
        plugins: [ElementPlus],
      },
      props: {
        items: ["nav-test-a", "nav-test-b", "nav-test-c"],
        modelValue: "nav-test-a",
      },
    });

    await waitFor(() => {
      expect(getByText("nav-test-a")).toHaveClass("is-active");
    });

    await fireEvent.click(getByText("nav-test-b"));
    await emitted("update:model-value");
  });
});
