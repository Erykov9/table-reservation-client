import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./DatePick.scss";
import Button from "../../../../components/Button/Button";
import moment from "moment";
import { DATE} from "../../../../siteValues"

const DatePick = ({ onClick, getDate }) => {
  const validationSchema = Yup.object().shape({
    term: Yup.date().required("Pole wymagane"),
  });

  const initialValues = {
    term: moment().format(DATE),
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onClick(3);
    getDate(values.term);
    setSubmitting(false);
  };

  return (
    <div className="reservetable-module">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Button onClick={() => onClick(1)}>Wróć</Button>
            <div className="reserve-form">
              <h2>Wybierz termin</h2>
              <label htmlFor="term">Termin:</label>
              <Field type="date" name="term" />
              <ErrorMessage
                name="term"
                component="div"
                className="error"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Dalej
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DatePick;