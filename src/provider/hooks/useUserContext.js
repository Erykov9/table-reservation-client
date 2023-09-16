import { useContext } from "react";
import { UserContext } from "../UserProvider";
import { fetchSetting } from "../../OdevFetch/fetchConfig";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser was used outside of its Provider");
  }
  const { isLogged, setLogged, setUserData, userData } = context;

  const isLoggedIn = async () => {
    const accessToken = sessionStorage.getItem("A_T");
    const refreshToken = sessionStorage.getItem("R_T");

    if (accessToken) {
      const output = await fetch(
        `${process.env.REACT_APP_API_PATH}/isLogged/${
          accessToken.split(" ")[1]
        }`,
        {
          ...fetchSetting,
          method: "GET",
          headers: {
            ...fetchSetting.headers,
            ["Access-Token"]: `${accessToken}`,
          },
        }
      ).then(res => res.json());

      setLogged(true);
      setUserData({ ...output.data, accessToken, refreshToken });
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("A_T");
    sessionStorage.removeItem("R_T");
    setLogged(false);
  };

  const setLogin = () => {
    setLogged(true);
  }

  return { isLogged, logOut, userData, isLoggedIn, setLogin };
};
