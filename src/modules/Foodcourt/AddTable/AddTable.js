import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import StatusDisplay from "../../../components/StatusDisplay/StatusDisplay";
import { useState } from "react";

const AddTable = ({ save, refetch, restaurantId, onClose, data, remove}) => {
  const [status, setStatus] = useState({
    status: undefined,
    message: ""
  });

  const initialValues = {
    capacity: data?.capacity || 1,
    table_number: data?.table_number || 1
  };

  const handleSubmit = async (values) => {
    const tableData = [
      {
        ...values,
        restaurant_id: data?.restaurant_id || Number(restaurantId),
        x: data?.x || 0,
        y: data?.y || 0,
        id: data?.id || undefined,
      },
    ];
    await save({body: tableData});
    refetch();
    onClose();
  };

  const removeHandler = async (e) => {
    e.preventDefault();
    const output = await remove({id: data.id});
    setStatus({
      status: output.status,
      message: output.message
    });

    refetch();
    setTimeout(() => {
      onClose();
    }, 2500)
  }

  const validationSchema = Yup.object().shape({
    capacity: Yup.number()
      .typeError("Musi być liczbą")
      .min(1, "Minimum to 1 osoba")
      .max(12, "Maksimum to 12 osób")
      .required("To pole jest wymagane"),
  });

  return (
    <div>
      {data ? <h2>Edytuj stolik</h2> : <h2>Dodaj stolik</h2>}
      {<StatusDisplay status={status.status}>{status.message}</StatusDisplay>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="capacity">Ilość osób:</label>
              <Field
                type="number"
                id="capacity"
                name="capacity"
                min="1"
                max="12"
              />
            </div>
            <div>
            <label htmlFor="table_number">Numer stolika:</label>
              <Field
                type="number"
                id="table_number"
                name="table_number"
                min="1"
                max="64"
              />
            </div>
            <Button type="submit">Dodaj</Button>
            {data && <Button variant="danger" onClick={(e) => removeHandler(e)}>Usuń</Button>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTable;
