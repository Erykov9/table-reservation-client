import "./Account.scss";
import Button from "../../../components/Button/Button";
import Modal from "../../../modules/Modal/Modal";
import { useState } from "react";
import EditAccountForm from "./EditAccountForm/EditAccountForm";

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
          <Button>Zarządzaj kontem</Button>
        </div>
        <div className="user-data">
          <h2>Dane użytkownika</h2>
          <p>Imię: <span>{user.name}</span> </p>
          <p>Nazwisko: <span>{user.last_name}</span></p>
          <p>Email: <span>{user.email}</span></p>
          <p>Nazwa firmy: <span>{user.company_name}</span></p>
          <p>Miejscowość: <span>{user.city}</span></p>
          <p>Ulica: <span>{user.street}</span></p>
          <Button onClick={() => setModalOpen(true)}>Edytuj dane</Button>
        </div>
        {modalOpen && <Modal onClose={() => setModalOpen(false)}><EditAccountForm user={user}/></Modal>}
      </div>
    </div>
  );
};

export default Account;
