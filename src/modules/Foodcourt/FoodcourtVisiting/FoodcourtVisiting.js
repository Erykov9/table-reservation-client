import Draggable from "react-draggable";
import "../Foodcourt.scss";
import { useState } from "react";
import DatePick from "./DatePick/DatePick";
import ReservationPick from "./ReservationPick/ReservationPick";

const FoodcourtVisiting = ({ tablePositions, restaurant }) => {
  const [step, setStep] = useState(1);
  const [tableData, setTableData] = useState({});
  const [date, setDate] = useState("");

  if (step === 2) {
    return <DatePick onClick={(step) => setStep(step)} getDate={(date) => setDate(date)}/>;
  }

  if (step === 3) {
    return <ReservationPick onClick={(step) => setStep(step)} tableData={tableData} date={date} restaurantData={restaurant}/>;
  }

  return (
    <div className="foodcourt-module">
      <h2>Zarezerwuj stolik</h2>
      <p>Aby zarezerwować stolik kliknij na niego i sprawdź dostępne terminy</p>
      <h3>
        Restauracja <span>{restaurant[0]?.name}</span>
      </h3>
      <div className="foodcourt-wrapper">
        <div className="foodcourt">
          {tablePositions?.map((item) => (
            <Draggable
              key={`table-${item.id}`}
              disabled={true}
              position={{ x: item.x, y: item.y }}
            >
              <div
                className="table"
                id={item.id}
                onClick={() => {
                  setStep(2);
                  setTableData(item);
                }}
              >
                <h5>Numer stolika: {item.table_number}</h5>
                <h5>{item.capacity} osobowy</h5>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodcourtVisiting;
