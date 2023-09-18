import "./styles.scss";
import Menu from "./Menu/Menu";
import { Routes, Route } from "react-router-dom";
import Account from "./Account/Account";
import { useUserContext } from "../../provider/hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import Management from "./Management/Management";
import Foodcourt from "../../modules/Foodcourt/Foodcourt";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, isLogged } = useUserContext();
  if (!isLogged) return navigate(-1)
  const { id, email, name, last_name, login, company_name, street, city } = userData;

  return (
    <div className="profile-page">
      <Menu />
      <div className="dashboard">
        <Routes>
          <Route exact path="/" element={<Account user={userData}/>}/>
          <Route exact path="/management" element={<Management userId={id}/>}/>
          <Route exact path="/management/:id" element={<Foodcourt />}/>
        </Routes>
      </div>
    </div>
  )
};

export default Profile;