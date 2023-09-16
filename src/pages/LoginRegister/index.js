import "./styles.scss";
import { useUserContext } from "../../provider/hooks/useUserContext";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({children}) => {
  const navigate = useNavigate();
  const { isLogged } = useUserContext();

  if(isLogged) return navigate("/profile");
  return (
    <div className="login-register-page">
      <div className="wrapper">
        <div className="form">
          {children}
        </div>
        <div className="image">
          <img src="banner_eat.png" alt="banner"></img>
        </div>
      </div>
    </div>
  )
};

export default LoginRegister;