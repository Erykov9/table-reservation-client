import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../../../../components/Button/Button';
import { useRestaurants } from '../../../../../OdevFetch';
import { useState } from 'react';
import StatusDisplay from '../../../../../components/StatusDisplay/StatusDisplay';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';

const AddRestaurant = ({ restaurantData }) => {
  const { save } = useRestaurants({ isLazy: true });
  const [status, setStatus] = useState({
    status: undefined,
    message: '',
  });

  const initialValues = {
    name: restaurantData.name || '',
    city: restaurantData.city || '',
    street: restaurantData.street || '',
    street_number: restaurantData.street_number || '',
    local_number: restaurantData.local_number || '',
    zipcode: restaurantData.zipcode || '',
    open_hour: restaurantData.open_hour || '',
    close_hour: restaurantData.close_hour || '',
    description: restaurantData.description || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole "Nazwa lokalu" jest wymagane'),
    city: Yup.string().required('Pole "Miasto" jest wymagane'),
    street: Yup.string().required('Pole "Ulica" jest wymagane'),
    street_number: Yup.string().required('Pole "Numer ulicy" jest wymagane'),
    local_number: Yup.string(),
    zipcode: Yup.string(),
    open_hour: Yup.string().required('Pole "Godziny otwarcia" jest wymagane'),
    close_hour: Yup.string().required('Pole "Godziny zamknięcia" jest wymagane'),
    description: Yup.string().max(300, 'Opis nie może zawierać więcej niż 300 znaków'),
  });

  const handleSubmit = async (values) => {
    const restaurantBody = {
      ...values,
      id: restaurantData.id,
    };

    const output = await save({ body: restaurantBody });
    if (output.status === 'error') {
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <Form>
        <StatusDisplay status={status.status}>{status.message}</StatusDisplay>
        <div>
          <label htmlFor="name">Nazwa lokalu *</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="city">Miasto *</label>
          <Field type="text" id="city" name="city" />
          <ErrorMessage name="city" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="street">Ulica *</label>
          <Field type="text" id="street" name="street" />
          <ErrorMessage name="street" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="street_number">Numer ulicy *</label>
          <Field type="text" id="street_number" name="street_number" />
          <ErrorMessage name="street_number" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="local_number">Numer lokalu</label>
          <Field type="text" id="local_number" name="local_number" />
          <ErrorMessage name="local_number" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="zipcode">Kod pocztowy</label>
          <Field type="text" id="zipcode" name="zipcode" />
          <ErrorMessage name="zipcode" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="open_hour">Godziny otwarcia *</label>
          <Field type="time" id="open_hour" name="open_hour" />
          <ErrorMessage name="open_hour" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="close_hour">Godziny zamknięcia *</label>
          <Field type="time" id="close_hour" name="close_hour" />
          <ErrorMessage name="close_hour" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="description">Opis</label>
          <Field as="textarea" id="description" name="description" />
          <ErrorMessage name="description" component="div" className="error" />
        </div>
        <Button type="submit" variant="success">
          {status.status === 'success' && <Spinner />} Wyślij
        </Button>
      </Form>
    </Formik>
  );
};

export default AddRestaurant;