import "./Banner.scss";
import Button from "../../components/Button/Button";

const Banner = () => {
  return (
    <div className="banner-module" id="home">
      <div className="content">
        <h1>LOREM IPSUM</h1>
        <h2>LOREM IPSUM DOLOR ET ARCEO</h2>
        <Button>Zarezerwuj stolik</Button>
      </div>
    </div>
    
  );
};

export default Banner;
