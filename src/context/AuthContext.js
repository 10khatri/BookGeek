import React from "react";
import { users } from "../backend/db/users";
export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  React.useEffect(() => {
    setUser(users[0]);
  }, []);
  const [user, setUser] = React.useState({});
  const [encodedToken, setEncodedToken] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <AuthContext.Provider
      value={{
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
