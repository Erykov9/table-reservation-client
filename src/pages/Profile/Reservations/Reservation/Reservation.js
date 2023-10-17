import { Spinner } from "react-bootstrap";
import { useReservations } from "../../../../OdevFetch";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import moment from "moment";
import { useState } from "react";
import { DATE } from "../../../../siteValues";
import Button from "../../../../components/Button/Button";
import "./Reservation.scss";
import { useParams } from "react-router-dom";
import ReservationTable from "./ReservationTable/ReservationTable";

const Reservation = () => {
  const [date, setDate] = useState([
    moment().subtract(1, "days").format(DATE),
    moment().format(DATE),
    moment().add(1, "days").format(DATE),
  ]);
  const { id } = useParams();
  const { payload, loading } = useReservations({
    isSecure: true,
    query: { restaurant_id: id, date },
  });
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  const reservations = payload?.data;

  const onBack = () => {
    navigate(-1);
  };

  const setDateHandler = (e) => {
    setDate([
      moment(e.target.value).subtract(1, "days").format(DATE),
      moment(e.target.value).format(DATE),
      moment(e.target.value).add(1, "days").format(DATE),
    ]);
  };

  const incrementDate = () => {
    const newDate = date.map((dateItem) =>
      moment(dateItem).add(1, "days").format(DATE)
    );
    setDate(newDate);
  };

  const decrementDate = () => {
    const newDate = date.map((dateItem) =>
      moment(dateItem).subtract(1, "days").format(DATE)
    );
    setDate(newDate);
  };

  return (
    <div className="reservation-profile-page p-3">
      <Button onClick={onBack}>Wróć</Button>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Skocz do daty</Form.Label>
          <Form.Control
            type="date"
            placeholder="name@example.com"
            value={date[1]}
            onChange={(e) => setDateHandler(e)}
          />
        </Form.Group>
      </Form>
      <div className="arrows">
        <h1 className="back" onClick={decrementDate}>
          {"<"}
        </h1>
        <h1>{date[1]}</h1>
        <h1 className="forward" onClick={incrementDate}>
          {">"}
        </h1>
      </div>
      <div className="d-flex flex-row justify-content-between">
        {date.map((item) => (
          <div>
            <h3>{item}</h3>
            <Table>
              <thead>
                <tr>
                  <th>Początek rezerwacji</th>
                  <th>Koniec rezerwacji</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(
                  (reservation) =>
                    moment(reservation.reservation_start).format(DATE) ===
                      item && <ReservationTable reservation={reservation} />
                )}
              </tbody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
