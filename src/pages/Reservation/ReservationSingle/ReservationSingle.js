import "./ReservationSingle.scss";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import ReservationPanel from "./ReservationPanel/ReservationPanel";
import Map from "./Map/Map";
import { useRestaurants } from "../../../OdevFetch";
import { useParams } from "react-router-dom";


const ReservationSingle = () => {
  const { id } = useParams();
  const { payload, loading } = useRestaurants({id: id});

  if(loading) return <div><Spinner></Spinner></div>;

  const { city, street, local_number} = payload?.data;

  return (
    <div className="reservation-single-page">
      <div className="reservation-single-wrapper">
        <div className="tabs">
          <Tabs
            defaultActiveKey="reservation"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="reservation" title="Rezerwacja">
              <ReservationPanel/>
            </Tab>
            <Tab eventKey="map" title="Mapa">
              <Map city={city} street={street} number={local_number}/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReservationSingle;
