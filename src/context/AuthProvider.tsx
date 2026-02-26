import { createContext, useContext, useState } from "react";

interface AuthContextValue {
  user: string | null;
  signin: (newUser: string, callback: () => void) => void;
  signout: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue | null {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const signin = (newUser: string, callback: () => void) => {
    setUser(newUser);
    callback();
  }

  const signout = (callback: () => void) => {
    
    callback();
    setUser(null);
  }

  const value = {
    user,
    signin,
    signout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}