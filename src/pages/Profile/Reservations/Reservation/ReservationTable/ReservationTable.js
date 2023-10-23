import moment from "moment";
import { DATE, TIME } from "../../../../../siteValues";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "../../../../../components/Button/Button";
import {useTables} from "../../../../../OdevFetch/index"
import { Spinner } from "react-bootstrap";

const ReservationTable = ({ reservation }) => {
  const { payload, loading, refetch } = useTables({isSecure: true, id: reservation?.table_id})
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <h4>Szczegóły rezerwacji</h4>
      <p>Imię: {reservation?.name}</p>
      <p>Opis: {reservation?.notes ? reservation.notes : "Brak"}</p>
    </Tooltip>
  );

  if(loading) return <Spinner/>;

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <tr>
        <td><p>Godz.:</p> <strong>{moment(reservation.reservation_start).format(TIME)}</strong></td>
        <td><p>Godz.:</p> <strong>{moment(reservation.reservation_end).format(TIME)}</strong></td>
        <td>{payload?.data}</td>
        <td><Button variant="danger">Usuń</Button><Button variant="default">Edytuj</Button></td>
      </tr>
    </OverlayTrigger>
  );
};

export default ReservationTable;
