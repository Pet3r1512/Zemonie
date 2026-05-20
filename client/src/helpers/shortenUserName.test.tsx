import { describe, expect, it } from "vitest";
import ShortenUserName from "./shortenUserName";

describe("Shorten User Name helper's test: ", () => {
  it("should return P when User Name is Peter", () => {
    const UserName = "Peter";
    const result = ShortenUserName(UserName);

    expect(result).toBe("P");
  });

  it("should return JD when User Name is John Dean", () => {
    const UserName = "John Dean";
    const result = ShortenUserName(UserName);

    expect(result).toBe("JD");
  });

  it("should return CP when User Name is Carrick Pattrick Alan Walker", () => {
    const UserName = "Carrick Pattrick Alan Walker";
    const result = ShortenUserName(UserName);

    expect(result).toBe("CP");
  });

  it("should return empty string when User Name is null", () => {
    expect(ShortenUserName(undefined)).toBe("");
  });
});
