import React from "react";
import { render } from "@testing-library/react";

import RecentlyPosts from "./RecentlyPosts";

describe("RecentlyPosts", () => {
  it("renders with default props", () => {
    render(<RecentlyPosts />);
  });
});
