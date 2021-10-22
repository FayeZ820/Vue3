import { render, waitFor, fireEvent } from "@testing-library/vue";
import ElementPlus from "element-plus";
import axios from "axios";

import Home from "./Home.vue";
// import { queryRateList } from '../services/exchange'

const dataSource = {
  rates: {
    btc: {
      name: "Bitcoin",
      unit: "BTC",
      value: 1.0,
      type: "crypto",
    },
    eth: {
      name: "Ether",
      unit: "ETH",
      value: 15.981,
      type: "crypto",
    },
  },
};

jest.mock("axios");

beforeAll(() => {
  process.env.VITE_API_HOST = "http://localhost:3000";
});

describe("Home", () => {
  it("should hide tips", () => {
    axios.get.mockResolvedValue(dataSource);

    const { getByText } = render(Home, {
      global: {
        plugins: [ElementPlus],
      },
    });

    expect(getByText("You are online now.")).not.toBeVisible();
    expect(getByText("You are offline now.")).not.toBeVisible();
  });

  it("should display offline tips", async () => {
    axios.get.mockResolvedValue(dataSource);

    const { getByText } = render(Home, {
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
    axios.get.mockResolvedValue(dataSource);

    jest.spyOn(navigator, "onLine", "get").mockReturnValueOnce(false);

    const { getByText } = render(Home, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await fireEvent(window, new Event("online"));

    await waitFor(() => {
      expect(getByText("You are online now.")).toBeVisible();
    });
  });

  it("should show all data items", async () => {
    axios.get.mockResolvedValue(dataSource);

    const { getByText } = render(Home, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await waitFor(() => {
      getByText("Bitcoin");
      getByText("Ether");
    });
  });
});
