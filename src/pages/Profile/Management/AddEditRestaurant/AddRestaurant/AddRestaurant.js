import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../../../components/Button/Button";
import { useRestaurants } from "../../../../../OdevFetch";
import { useState } from "react";
import StatusDisplay from "../../../../../components/StatusDisplay/StatusDisplay";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";

const AddRestaurant = ({ userId }) => {
  const { save } = useRestaurants({ isLazy: true });
  const [status, setStatus] = useState({
    status: undefined,
    message: "",
  });

  const initialValues = {
    name: "",
    city: "",
    street: "",
    street_number: "",
    local_number: null,
    zipcode: "",
    phone: "",
    open_hour: "",
    close_hour: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole "Nazwa lokalu" jest wymagane'),
    city: Yup.string().required('Pole "Miasto" jest wymagane'),
    street: Yup.string().required('Pole "Ulica" jest wymagane'),
    street_number: Yup.string().required('Pole "Numer ulicy" jest wymagane'),
    phone: Yup.string()
      .matches(/^\d+$/, "Numer telefonu może zawierać tylko cyfry")
      .min(9, "Numer telefonu musi zawierać co najmniej 9 cyfr")
      .max(15, "Numer telefonu może zawierać maksymalnie 15 cyfr")
      .required('Pole "Telefon" jest wymagane'),
    open_hour: Yup.string().required(
      'Pole "Godziny otwarcia" jest wymagane'
    ),
    close_hour: Yup.string().required(
      'Pole "Godziny zamknięcia" jest wymagane'
    ),
    description: Yup.string().max(
      300,
      "Opis nie może zawierać więcej niż 300 znaków"
    ),
  });

  const handleSubmit = async (values) => {
    const restaurantData = {
      ...values,
      user_id: userId,
    };
    console.log(values)

    const output = await save({ body: restaurantData });
    if (output.status === "error") {
      setStatus({
        status: output.status,
        message: output.message,
      });
    } else {
      setStatus({
        status: output.status,
        message: output.message,
      });

      setTimeout(() => {
        document.location.reload();
      }, 1500);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <StatusDisplay status={status.status}>{status.message}</StatusDisplay>

          <div className="form-group">
            <label htmlFor="name">Nazwa lokalu *</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="city">Miasto *</label>
            <Field type="text" id="city" name="city" />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon *</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="street">Ulica *</label>
            <Field type="text" id="street" name="street" />
            <ErrorMessage name="street" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="street_number">Numer ulicy *</label>
            <Field type="text" id="street_number" name="street_number" />
            <ErrorMessage
              name="street_number"
              component="div"
              className="error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="local_number">Numer lokalu</label>
            <Field type="text" id="local_number" name="local_number" />
            <ErrorMessage
              name="local_number"
              component="div"
              className="error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Kod pocztowy *</label>
            <Field type="text" id="zipcode" name="zipcode" />
            <ErrorMessage name="zipcode" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="open_hour">Godziny otwarcia *</label>
            <Field type="time" id="open_hour" name="open_hour" />
            <ErrorMessage
              name="open_hour"
              component="div"
              className="error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="close_hour">Godziny zamknięcia *</label>
            <Field type="time" id="close_hour" name="close_hour" />
            <ErrorMessage
              name="close_hour"
              component="div"
              className="error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <Button type="submit" variant="success">
            {status.status === "success" && <Spinner />} Wyślij
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddRestaurant;
