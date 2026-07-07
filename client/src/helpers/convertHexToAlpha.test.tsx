import { describe, expect, it } from "vitest";
import convertHexToAlpha from "./convertHexToAlpha";

describe("Convert Hex Color to Alpha helper's test: ", () => {
  it("should return rgba(127, 17, 224, 1) when hex color is #7f11e0 and alpha is 1", () => {
    const hex: string = "#7f11e0";
    const alpha: number = 1;

    const result = convertHexToAlpha(hex, alpha);

    expect(result).equals("rgba(127, 17, 224, 1)");
  });

  it("should return rgba(162, 123, 162, 0.5) when hex color is #a27ba2 and alpha is 0.5", () => {
    const hex: string = "#a27ba2";
    const alpha: number = 0.5;

    const result = convertHexToAlpha(hex, alpha);

    expect(result).equals("rgba(162, 123, 162, 0.5)");
  });
});
