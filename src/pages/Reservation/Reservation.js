import "./Reservation.scss";
import { useRestaurants } from "../../OdevFetch";
import { Form, Spinner, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";

const Reservation = () => {
  const { payload, loading } = useRestaurants();
  const [cities, setCities] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const payloadData = payload?.data?.results;
    const cities = new Set(payloadData?.map((item) => item.city));
    setCities([...cities]);
    setSelectedCity([...cities][0]);
  }, [loading, payload]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleContinueClick = () => {
    if (selectedCity) {
      const filtered = payload.data.results.filter(
        (restaurant) => restaurant.city === selectedCity
      );
      setFilteredRestaurants(filtered);
    }
  };

  const backHandler = () => {
    setFilteredRestaurants([]);
    setSelectedCity(cities[0])
  }

  if (loading) return <Spinner />;

  return (
    <div className="reservation-page">
      <div className="reservation-wrapper">
      {filteredRestaurants.length > 0 && <div className="back"><Button onClick={backHandler}>Wróć</Button></div>}

        {filteredRestaurants.length === 0 && (
          <>
            <h1>Wybierz miasto</h1>
            <Form.Select
              aria-label="Default select example"
              onChange={handleCityChange}
            >
              <option disabled>Wybierz miasto</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
            <Button onClick={handleContinueClick}>Dalej</Button>
          </>
        )}

        {filteredRestaurants.length > 0 && (
          <div className="restaurant-list">
            <h2>Restauracje {selectedCity}:</h2>
            <ul>
              {filteredRestaurants.map((restaurant) => (
                <Card>
                  <Card.Body >
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>
                      {restaurant.city} {restaurant.zipcode}<br/>{restaurant.street} {restaurant.street_number}/{restaurant.local_number}<br/>
                      Ocena: 7.2/10
                    </Card.Text>
                    <Button link={`${restaurant.id}`}>Sprawdź wolne stoliki</Button>
                  </Card.Body>
                </Card>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;
