import { render, waitFor, fireEvent } from "@testing-library/vue";
import ElementPlus from "element-plus";

import Content from "./Content.vue";

const dataSource = [
  {
    name: "Bitcoin",
    unit: "BTC",
    value: 1,
    type: "crypto",
    coin: "btc",
  },
  {
    name: "Ether",
    unit: "ETH",
    value: 15.981,
    type: "crypto",
    coin: "eth",
  },
];

describe("Content", () => {
  it("should show all data items", async () => {
    const { getByText } = render(Content, {
      global: {
        plugins: [ElementPlus],
      },
      props: {
        dataSource,
      },
    });

    await waitFor(() => {
      getByText("Bitcoin");
      getByText("Ether");
    });
  });

  it("should render data with card", async () => {
    const { queryByRole } = render(Content, {
      global: {
        plugins: [ElementPlus],
      },
      props: {
        dataSource,
      },
    });

    await fireEvent(window, new Event("resize"));

    await waitFor(() => {
      queryByRole("card");
    });
  });
});
