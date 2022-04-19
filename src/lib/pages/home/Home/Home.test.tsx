import { render } from "@testing-library/react";

import Home from "./Home";

describe("Home page", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });
});
