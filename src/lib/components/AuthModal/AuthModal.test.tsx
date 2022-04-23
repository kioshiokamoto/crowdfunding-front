import React from "react";
import { render } from "@testing-library/react";

import AuthModal from "./AuthModal";

describe("AuthModal", () => {
  it("renders with default props", () => {
    render(
      <AuthModal
        isOpen={true}
        onClose={() => {}}
        setType={() => {}}
        type="LOGIN"
      />
    );
  });
});
