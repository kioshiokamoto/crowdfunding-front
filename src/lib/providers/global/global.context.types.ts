// Interfaces and types from context Global

// Provider Props
export interface GlobalProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface GlobalProviderValue {
  user: any;
  setUser: React.Dispatch<any>;
}
