import React from "react";
import { render } from "@testing-library/react";

import Testimonial from "./Testimonial";

describe("Testimonial", () => {
  it("renders with default props", () => {
    render(<Testimonial />);
  });
});
