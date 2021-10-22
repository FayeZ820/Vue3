import { save, restore } from "./cache";

describe("save", () => {
  it("should save the given object", () => {
    const obj = {
      foo: "bar",
    };

    save("foo", obj);
    expect(restore("foo")).toEqual(obj);
  });
});

describe("restore", () => {
  it("should return null if the given key is not found", () => {
    expect(restore("bar")).toBeUndefined();
  });
});
