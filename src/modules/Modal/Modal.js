import "./Modal.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({children, onClick, onClose}) => {
  return (
    <div className="modal-module">
      <div className="modal-wrapper">
       <span className="x-mark" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></span>
       {children}
      </div>
    </div>
  )
};

export default Modal;