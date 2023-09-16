import "./Button.scss";
import { NavLink } from "react-router-dom";

const Button = ({
  type = "button",
  children,
  variant = "default",
  onClick,
  link,
}) => {
  if (link)
    return (
      <NavLink className={`button ${variant}`} to={link} onClick={onClick}>
        {children}
      </NavLink>
    );

  return (
    <button type={type} className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
