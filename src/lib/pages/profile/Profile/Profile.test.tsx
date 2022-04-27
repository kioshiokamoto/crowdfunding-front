import React from "react";
import { render } from "@testing-library/react";

import Profile from "./Profile";

describe("Profile page", () => {
  it("renders without crashing", () => {
    render(<Profile />);
  });
});
