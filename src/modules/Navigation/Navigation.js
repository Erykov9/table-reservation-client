import "./Navigation.scss";
import Button from "../../components/Button/Button";
import { navigationValues, navigationPanelValues } from "../../siteValues";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ isLogged, user }) => {
  const [activeNav, setActiveNav] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navigation-module">
      <div className="navi-items">
        {!isLogged ? (
          <ul>
            {navigationPanelValues.map((navItem) => (
              <li key={`nav-${navItem.id}`}>
                <Button variant="nav-link" link={navItem.href}>
                  {navItem.value}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Button variant="nav-link" link="profile">
            <FontAwesomeIcon icon={faUser} /> Witaj{" "}
            <h4>
              {user.name} {user.last_name}
            </h4>
          </Button>
        )}
      </div>
      <div className="logo">
        <h2 onClick={() => navigate("/")}>TableTango</h2>
      </div>
      <div className="navi-items">
        <ul>
          {navigationValues.map((navItem) => (
            <li key={`nav-${navItem.id}`}>
              <Button variant="nav-link" link={navItem.href}>
                {navItem.value}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="navi-items-mobile">
        <div className="icon-wrapper">
          <h2
            onClick={() => setActiveNav(!activeNav)}
            className={activeNav && "icon"}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </h2>
        </div>
        <div className={`items ${activeNav ? "active-nav" : ""}`}>
          {!isLogged ? (
            <ul>
              {navigationPanelValues.map((navItem) => (
                <li key={`nav-${navItem.id}`}>
                  <Button variant="nav-link" link={navItem.href}>
                    {navItem.value}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <Button variant="nav-link" link="profile">
              <FontAwesomeIcon icon={faUser} /> Witaj{" "}
              <h4>
                {user.name} {user.last_name}
              </h4>
            </Button>
          )}
          <ul>
            {navigationValues.map((navItem) => (
              <li key={`nav-${navItem.id}`}>
                <Button variant="nav-link" link={navItem.href}>
                  {navItem.value}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
