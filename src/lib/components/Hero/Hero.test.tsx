import React from "react";
import { render } from "@testing-library/react";

import Hero from "./Hero";

describe("Hero", () => {
  it("renders with default props", () => {
    render(<Hero />);
  });
});
