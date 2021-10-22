import { uniq } from "./helpers";

describe("uniq", () => {
  it("should return unique values", () => {
    const result = uniq([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
