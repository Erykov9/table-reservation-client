import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import { useUsers } from "../../../OdevFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useUsers({ isLazy: true });
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: "",
    message: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Imię musi mieć co najmniej 3 znaki")
      .max(30, "Imię nie może przekraczać 30 znaków")
      .matches(
        /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/,
        "Imię może zawierać tylko litery i spacje"
      )
      .required("To pole jest wymagane"),
    last_name: Yup.string()
      .min(3, "Nazwisko musi mieć co najmniej 3 znaki")
      .max(30, "Nazwisko nie może przekraczać 30 znaków")
      .matches(
        /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-]+$/,
        "Nazwisko może zawierać tylko litery i spacje"
      )
      .required("To pole jest wymagane"),
    login: Yup.string()
      .min(6, "Login musi mieć przynajmniej 6 znaków")
      .max(20, "Login nie może przekraczać 20 znaków")
      .required("To pole jest wymagane"),
    email: Yup.string()
      .email("Niepoprawny adres email")
      .required("To pole jest wymagane"),
    password: Yup.string()
      .matches(
        /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną cyfrę i jeden znak specjalny"
      )
      .required("To pole jest wymagane"),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password"), null], "Hasła muszą być identyczne")
      .required("To pole jest wymagane"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    const output = await register({ body: values });
    if (output.status === "success") {
      setError({
        status: output.status,
        message: output.message,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setError({
        status: output.status,
        message: output.message,
      });
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Rejestracja</h2>
        <p>Zarejestruj swoją restaurację!</p>
        {error.status === "success" ? (
          <h3 className="success">{error.message}</h3>
        ) : (
          error.status === "error" && <h3 className="error">{error.message}</h3>
        )}
      </div>
      <div className="register-login">
        <Formik
          initialValues={{
            name: "",
            last_name: "",
            login: "",
            password: "",
            passwordRepeat: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-part_half">
                <label htmlFor="name">Imię</label>
                <Field type="text" name="name" placeholder="Imię *" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-part_half">
                <label htmlFor="last_name">Nazwisko</label>
                <Field type="text" name="last_name" placeholder="Nazwisko *" />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-part">
                <label htmlFor="login">Login</label>
                <Field type="text" name="login" placeholder="Login *" />
                <ErrorMessage
                  name="login"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-part">
                <label htmlFor="email">Email</label>
                <Field type="text" name="email" placeholder="Email *" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-part_half">
                <label htmlFor="password">Hasło</label>
                <Field type="password" name="password" placeholder="Hasło *" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-part_half">
                <label htmlFor="passwordRepeat">Powtórz hasło</label>
                <Field
                  type="password"
                  name="passwordRepeat"
                  placeholder="Powtórz hasło *"
                />
                <ErrorMessage
                  name="passwordRepeat"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-info">
                <p>
                  Rejestracja konta w serwisie oznacza akceptacje obowiązującego{" "}
                  <span>REGULAMINU.</span>
                </p>
              </div>
              <div className="btns">
                <Button variant="success" type="submit" disabled={isSubmitting}>
                  Zarejestruj
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
