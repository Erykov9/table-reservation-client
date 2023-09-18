import "./Account.scss";
import Button from "../../../components/Button/Button";
import Modal from "../../../modules/Modal/Modal";
import { useState } from "react";
import EditAccountForm from "./EditAccountForm/EditAccountForm";
import { Card, ListGroup } from "react-bootstrap";

const Account = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="account-page">
      <div className="wrapper">
        <div className="header">
          <h2>Panel użytkownika </h2>
          <h1>
            {user.name} {user.last_name}
          </h1>
        </div>
        <div className="user-data">
        <h2>Dane użytkownika</h2>

          <Card style={{ width: "20rem", }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Imię: <span>{user.name}</span>{" "}</ListGroup.Item>
              <ListGroup.Item>Nazwisko: <span>{user.last_name}</span></ListGroup.Item>
              <ListGroup.Item>Email: <span>{user.email}</span></ListGroup.Item>
              <ListGroup.Item>Firma: <span>{user.company_name}</span></ListGroup.Item>
              <ListGroup.Item>Miasto: <span>{user.city}</span></ListGroup.Item>
              <ListGroup.Item>Ulica: <span>{user.street}</span></ListGroup.Item>
            </ListGroup>
          </Card>
          <Button onClick={() => setModalOpen(true)}>Edytuj dane</Button>
        </div>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <EditAccountForm user={user} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Account;
