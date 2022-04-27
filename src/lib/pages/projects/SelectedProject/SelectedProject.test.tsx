import React from "react";

import { render } from "@testing-library/react";
import SelectedProject from "./SelectedProject";

describe("SelectedProject", () => {
  it("renders with default props", () => {
    render(<SelectedProject />);
  });
});
