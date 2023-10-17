import moment from "moment";
import { DATETIME } from "../../../../../siteValues";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "../../../../../components/Button/Button";

const ReservationTable = ({ reservation }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <h4>Szczegóły rezerwacji</h4>
      <p>Imię: {reservation?.name}</p>
      <p>Opis: {reservation?.description ? reservation.description : "Brak"}</p>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <tr>
        <td>{moment(reservation.reservation_start).format(DATETIME)}</td>
        <td>{moment(reservation.reservation_end).format(DATETIME)}</td>
        <td><Button variant="danger">Usuń</Button></td>
      </tr>
    </OverlayTrigger>
  );
};

export default ReservationTable;
