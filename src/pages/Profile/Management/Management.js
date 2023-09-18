import "./Management.scss";
import Button from "../../../components/Button/Button";
import { useRestaurants } from "../../../OdevFetch";
import Modal from "../../../modules/Modal/Modal";
import { useState } from "react";
import AddEditRestaurant from "./AddEditRestaurant";
import { Table, Spinner } from "react-bootstrap";
import StatusDisplay from "../../../components/StatusDisplay/StatusDisplay";
import { useNavigate } from "react-router-dom";

const Management = ({ userId }) => {
  const { payload, loading, refetch, remove } = useRestaurants({
    isSecure: true,
  });
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [status, setStatus] = useState({
    status: undefined,
    message: "",
  });

  if (loading) return <Spinner></Spinner>;
  const restaurants = payload?.data?.results;

  const openEditModal = (restaurantData) => {
    setSelectedRestaurant(restaurantData);
    setOpenModal(true); 
  };

  const removeHandler = async (e, id) => {
    e.preventDefault();
    const output = await remove({id});

    setStatus({
      status: output.status,
      message: output.message
    });

    if(output.status === "success") {
      refetch();
      setTimeout(() => {
        setStatus({
          status: undefined,
          message: ""
        })
      }, 1500)
    }
  };

  return (
    <div className="management-page">
      <div className="wrapper">
        <div className="list">
          <h2>Lista Twoich restauracji</h2>
          <StatusDisplay status={status.status}>{status.message}</StatusDisplay>
          {restaurants?.length > 0 ? (
            <Table striped bordered hover variant="primary">
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Miasto i Kod pocztowy</th>
                  <th>Adres</th>
                  <th>Akcja</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{`${item.city}, ${item.zipcode}`}</td>
                    <td>{`${item.street}, ${item.street_number}${
                      item.local_number !== null ? "/" + item.local_number : ""
                    }`}</td>
                    <td>
                      <Button variant="danger" onClick={(e) => removeHandler(e, item.id)}>Usuń</Button>
                      <Button onClick={() => openEditModal(item)}>
                        Edytuj
                      </Button>
                      <Button variant="success" onClick={() => navigate(`${item.id}`)}>Zarządzaj</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <>
              <h5>Nie posiadasz jeszcze restauracji</h5>
            </>
          )}
          <Button
            variant="success"
            onClick={() => {
              setSelectedRestaurant(null);
              setOpenModal(true);
            }}
          >
            Dodaj restaurację
          </Button>
        </div>
        {openModal && (
          <Modal onClose={() => setOpenModal(false)}>
            <AddEditRestaurant
              userId={userId}
              refetch={refetch}
              restaurantData={selectedRestaurant}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Management;
