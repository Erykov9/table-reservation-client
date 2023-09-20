import { Spinner, Table } from "react-bootstrap";
import "./ReservationPick.scss";
import { useReservations } from "../../../../OdevFetch";
import Button from "../../../../components/Button/Button";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DATETIME } from "../../../../siteValues";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ReservationPick = ({ onClick, tableData, date, restaurantData }) => {
  const { id } = useParams();
  const { payload, loading } = useReservations({
    query: { date, restaurantId: id, tableId: tableData.id },
  });

  if (loading) return <Spinner></Spinner>;

  const initialValues = {
    start_date: "",
    end_date: "",
    name: "",
    last_name: "",
    notes: "",
  };

  const validationSchema = Yup.object().shape({
    start_date: Yup.string()
      .required("Godzina rozpoczęcia rezerwacji jest wymagana")
      .test(
        "is-earlier",
        "Godzina rozpoczęcia musi być wcześniejsza niż godzina zakończenia",
        function (value, { parent }) {
          const { end_date } = parent;

          if (!value || !end_date) {
            return true;
          }

          const startTime = moment(value, "HH:mm");
          const endTime = moment(end_date, "HH:mm");

          return startTime.isBefore(endTime);
        }
      )
      .test(
        "is-before-close",
        "Rezerwacja musi być podczas godzin otwarcia restauracji",
        (value) => {
          if (
            moment(restaurantData[0].open_hour, "HH:mm") >
              moment(value, "HH:mm") ||
            moment(restaurantData[0].close_hour, "HH:mm") <
              moment(value, "HH:mm")
          ) {
            return false;
          }
          return true;
        }
      ),
    end_date: Yup.string().required(
      "Godzina zakończenia rezerwacji jest wymagana"
    )
    .test(
      "is-before-close",
      "Rezerwacja musi być podczas godzin otwarcia restauracji",
      (value) => {
        if (
          moment(restaurantData[0].open_hour, "HH:mm") >
            moment(value, "HH:mm") ||
          moment(restaurantData[0].close_hour, "HH:mm") <
            moment(value, "HH:mm")
        ) {
          return false;
        }
        return true;
      }
    ),
    name: Yup.string().required("Imię jest wymagane"),
    notes: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log({
      ...values,
      table_id: tableData.id,
      restaurant_id: Number(id),
    });
    setSubmitting(false);
  };

  const results = payload?.data;

  return (
    <div className="reservation-pick">
      <div className="reservation-pick-btn">
        <Button onClick={() => onClick(2)}>Wróć</Button>
      </div>
      <h3>Godziny otwarcia</h3>
      <h5>
        {`${restaurantData[0].open_hour.split(":")[0]}:${
          restaurantData[0].open_hour.split(":")[1]
        }`}
        -
        {`${restaurantData[0].close_hour.split(":")[0]}:${
          restaurantData[0].close_hour.split(":")[1]
        }`}
      </h5>

      <h1>Rezerwacje</h1>
      {results.length > 0 ? (
        <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th>Numer stolika</th>
              <th>Zajęte od:</th>
              <th>Zajęte do:</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr>
                <td>{tableData.table_number}</td>
                <td>{moment(item.reservation_start).format(DATETIME)}</td>
                <td>{moment(item.reservation_end).format(DATETIME)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>Nie ma żadnych rezerwacji w danym dniu</h3>
      )}
      <h1>Zarezerwuj stolik</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="start_date">
                Godzina rozpoczęcia rezerwacji *
              </label>
              <Field type="time" name="start_date" className="form-control" />
              <ErrorMessage
                name="start_date"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_date">Godzina zakończenia rezerwacji *</label>
              <Field type="time" name="end_date" className="form-control" />
              <ErrorMessage name="end_date" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="name">Imię *</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Nazwisko</label>
              <Field type="text" name="last_name" className="form-control" />
              <ErrorMessage
                name="last_name"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Uwagi</label>
              <Field as="textarea" name="notes" className="form-control" />
              <ErrorMessage name="notes" component="div" className="error" />
            </div>

            <Button type="submit" disabled={isSubmitting} variant="success">
              Zarezerwuj
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReservationPick;
