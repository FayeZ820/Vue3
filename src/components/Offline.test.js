import { render, waitFor, fireEvent } from "@testing-library/vue";
import ElementPlus from "element-plus";

import Offline from "./Offline.vue";

describe("Offline", () => {
  it("should hide tips", () => {
    const { getByText } = render(Offline, {
      global: {
        plugins: [ElementPlus],
      },
    });

    expect(getByText("You are online now.")).not.toBeVisible();
    expect(getByText("You are offline now.")).not.toBeVisible();
  });

  it("should display offline tips", async () => {
    const { getByText } = render(Offline, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await fireEvent(window, new Event("offline"));

    await waitFor(() => {
      expect(getByText("You are offline now.")).toBeVisible();
    });
  });

  it("should display online tips", async () => {
    jest.spyOn(navigator, "onLine", "get").mockReturnValueOnce(false);

    const { getByText } = render(Offline, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await fireEvent(window, new Event("online"));

    await waitFor(() => {
      expect(getByText("You are online now.")).toBeVisible();
    });
  });
});
