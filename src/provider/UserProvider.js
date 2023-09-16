import { createContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [isLogged, setLogged] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider
      value={{
        isLogged,
        setLogged,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;