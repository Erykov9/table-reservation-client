import React from "react";
import Button from "../../../components/Button/Button";
import { useUsers } from "../../../OdevFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../provider/hooks/useUserContext";

const Login = () => {
  const { login } = useUsers({ isLazy: true });
  const { setLogin, isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: "",
    message: "",
  });
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const output = await login({ body: loginData });
    console.log(output);

    if (output.status === "success") {
      sessionStorage.setItem("A_T", output?.body?.accessToken);
      sessionStorage.setItem("R_T", output?.body?.refreshToken);
      setError({
        status: output.status,
        message: output.message,
      });

      setTimeout(() => {
        setLogin(true);
        isLoggedIn();
      }, 1500);
    } else {
      setError({
        status: output.status,
        message: output.message,
      });
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Logowanie</h2>
        {error.status === "success" ? (
          <h3 className="success">{error.message}</h3>
        ) : (
          error.status === "error" && <h3 className="error">{error.message}</h3>
        )}
      </div>
      <div className="register-login">
        <form>
          <div className="form-part">
            <label htmlFor="login">Login</label>
            <input
              type="text"
              name="login"
              placeholder="Login"
              value={loginData.login}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  login: e.target.value,
                })
              }
            />
          </div>
          <div className="form-part">
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              name="password"
              placeholder="Hasło"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="form-info">
            <input type="checkbox" />
          </div>
          <div className="btns">
            <Button
              variant="success"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Zaloguj
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
