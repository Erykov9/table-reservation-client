import Foodcourt from "../../../../modules/Foodcourt/Foodcourt";
import "./ReservationPanel.scss";

const ReservationPanel = () => {
  return (
    <div className="reservation-panel">
      <Foodcourt isVisiting={true} />
    </div>
  );
};

export default ReservationPanel;
