import { useInterval } from "./use";

describe("useInterval", () => {
  it("should throw an error with invalid duration", () => {
    expect(() => {
      useInterval(() => {}, 0);
    }).toThrowError("Duration must be greater than 0");
  });

  it("should works", () => {
    let count = 0;

    useInterval(() => {
      count++;
    }, 1000);

    setTimeout(() => {
      expect(count).toBe(1);
    }, 1500);
  });
});
