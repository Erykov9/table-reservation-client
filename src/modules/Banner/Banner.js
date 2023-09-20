import "./Banner.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="banner-module" id="home">
      <div className="content">
        <h1>LOREM IPSUM</h1>
        <h2>LOREM IPSUM DOLOR ET ARCEO</h2>
        <Button onClick={() => navigate("/reservation")}>Zarezerwuj stolik</Button>
      </div>
    </div>
    
  );
};

export default Banner;
