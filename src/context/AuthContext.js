import React from "react";
import { users } from "../backend/db/users";
export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = React.useState({});

  const [encodedToken, setEncodedToken] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    setUser(users[0]);
  }, [encodedToken]);
  function logout() {
    setIsLoggedIn(false);
    setEncodedToken("");
    setUser({});

    localStorage.removeItem("encodedToken");
  }
  return (
    <AuthContext.Provider
      value={{
        logout,
        isLoggedIn,
        setIsLoggedIn,
        setEncodedToken,
        encodedToken,
        setUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
