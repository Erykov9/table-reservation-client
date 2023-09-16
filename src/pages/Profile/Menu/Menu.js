import "./Menu.scss";
import { menuValues } from "../../../siteValues";
import Button from "../../../components/Button/Button";
import { useUserContext } from "../../../provider/hooks/useUserContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { logOut } = useUserContext();
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    logOut();
    navigate("/");
  };

  return (
    <div className="menu">
      <div className="menu-list">
        <ul>
          {menuValues.map(item => <Button link={item.href} variant="success">{item.value}</Button>)}
          <Button variant="danger" onClick={(e) => logoutHandler(e)}>LogOut</Button>
        </ul>
      </div>
    </div>
  )
};

export default Menu;