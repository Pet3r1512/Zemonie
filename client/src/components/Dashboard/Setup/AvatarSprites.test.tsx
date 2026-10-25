import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AvatarSprites from "./AvatarSprites";

describe("AvatarSprites", () => {
  it("renders the avatar sprite sheet", () => {
    render(<AvatarSprites />);

    expect(
      document.querySelector('svg[symbol="#avatar-fox"]') ?? document.querySelector("svg"),
    ).toBeInTheDocument();
  });

  it("defines all avatar symbols", () => {
    render(<AvatarSprites />);

    const expectedIds = [
      "avatar-fox",
      "avatar-cat",
      "avatar-panda",
      "avatar-bunny",
      "avatar-dino",
      "avatar-bear",
      "avatar-robot",
      "avatar-shroom",
      "avatar-fish",
      "avatar-owl",
    ];

    expectedIds.forEach((id) => {
      expect(document.getElementById(id)).toBeInTheDocument();
    });
  });
});
