import React from "react";
import { render } from "@testing-library/react";

import Projects from "./Projects";

describe("Projects page", () => {
  it("renders with default props", () => {
    render(<Projects />);
  });
});
