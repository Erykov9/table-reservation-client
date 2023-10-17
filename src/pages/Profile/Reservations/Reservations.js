import { useRestaurants } from "../../../OdevFetch";
import { Spinner } from "react-bootstrap";
import "./Reservations.scss";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Reservations = () => {
  const { payload, loading } = useRestaurants({
    isSecure: true,
  });
  const navigate = useNavigate();
  if (loading) return <Spinner />;

  const restaurants = payload?.data?.results;

  const clickHandler = (id) => {
    navigate(`${id}`)
  }

  return (
    <div className="reservations-profile-page">
      <h2>Twoje restauracje</h2>
      {restaurants.map((item) => (
        <Card body onClick={() => clickHandler(item.id)}><h3><strong>{item.name}</strong></h3></Card>
      ))}
    </div>
  );
};

export default Reservations;
