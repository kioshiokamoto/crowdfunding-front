import React from "react";
import { render } from "@testing-library/react";

import Card from "./Card";

describe("Card", () => {
  it("renders with default props", () => {
    render(<Card date="" description="" img="" name="" place="" title="" />);
  });
});
