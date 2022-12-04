import { safeStringify } from "./util";

describe("util", () => {
  it("should return single json object even with circular reference", () => {
    const circularReference = { test: "test-data" };
    circularReference["myself"] = circularReference;
    expect(() => {
      safeStringify(circularReference);
    }).not.toThrowError();
  });
});
