// Interfaces and types from component AuthModal

import { Dispatch, SetStateAction } from "react";

// Component Props
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "LOGIN" | "REGISTER";
  setType: Dispatch<SetStateAction<"LOGIN" | "REGISTER">>;
}

// Styled Component Props
export interface AuthModalStyledProps {
  className: string;
}
