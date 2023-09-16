import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../../components/Button/Button';
import { useUsers } from '../../../../OdevFetch';
import { useState } from 'react';
import "./EditAccountForm.scss";

const EditAccountForm = ({user}) => {
  const { save } = useUsers({isLazy: true});
  const [status, setStatus] = useState({
    status: "",
    message: ""
  });
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole "Imię" jest wymagane'),
    last_name: Yup.string().required('Pole "Nazwisko" jest wymagane'),
    company_name: Yup.string(),
    street: Yup.string(),
    city: Yup.string(),
    email: Yup.string().email('Nieprawidłowy format adresu e-mail').required('Pole "Email" jest wymagane'),
  });
  
  const initialValues = {
    name: user.name,
    last_name: user.last_name,
    company_name: user?.company_name || "",
    street: user?.street || "",
    city: user?.city || "",
    email: user.email,
  };
  
  const submitHandler = async (values) => {
    const output = await save({body: {...values, id: user.id}});
    if(output.status === "success") {
      setStatus({
        status: output.status,
        message: output.message
      })
      

      setTimeout(() => {
        document.location.reload()
      }, 1500);

    } else if (output.status === "error") {
      setStatus({
        status: output.status,
        message: output.message
      })
    }
  };

  console.log(status)
  return (
    <div className="edit-account">
      <h2>Edytuj dane</h2>
      {status.status === "error" ? <p className="error">Elo</p> : status.status === "success" ? <p className="success">Pomyślnie zapisano dane</p> : ''}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Imię:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Nazwisko:</label>
            <Field type="text" id="last_name" name="last_name" />
            <ErrorMessage name="last_name" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="company_name">Nazwa firmy:</label>
            <Field type="text" id="company_name" name="company_name" />
          </div>

          <div className="form-group">
            <label htmlFor="street">Ulica:</label>
            <Field type="text" id="street" name="street" />
          </div>

          <div className="form-group">
            <label htmlFor="city">Miasto:</label>
            <Field type="text" id="city" name="city" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <Button variant="success" type="submit" >Zapisz zmiany</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditAccountForm;