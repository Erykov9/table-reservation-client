import { useState, useEffect } from "react";
import "./Foodcourt.scss";
import { useParams } from "react-router-dom";
import { useRestaurants } from "../../OdevFetch";
import { Spinner } from "react-bootstrap";
import Button from "../../components/Button/Button";
import Draggable from "react-draggable";
import { useTables } from "../../OdevFetch";

const Foodcourt = () => {
  const { id } = useParams();
  const { payload, loading } = useRestaurants({ id, isSecure: true });
  const { payload: tablePayload, loading: tableLoading, save, refetch} = useTables({ id })
  const [isEdit, setIsEdit] = useState(false);

  const [tablePositions, setTablePositions] = useState([]);

  useEffect(() => {
    if(!tableLoading) {
      setTablePositions(tablePayload?.data?.results)
    }
  }, [tableLoading])

  const onDrag = (e, id, dragData) => {
    const {x,y} = dragData;
    console.log(x, y)
    const draggedTableIndex = tablePositions.findIndex((item) => item.id === id);

    if (draggedTableIndex !== -1) {
      const newPosition = { ...tablePositions[draggedTableIndex] };
      newPosition.x += e.movementX;
      newPosition.y += e.movementY;

      const newTablePositions = [...tablePositions];
      newTablePositions[draggedTableIndex] = newPosition;

      setTablePositions(newTablePositions);
    }
    // TO FINISH GET EXACT X & Y POSITIONS
  };

  if (loading) return <Spinner></Spinner>;
  const restaurant = payload?.data;

  const saveHandler = async () => {
    const output = await save({body: tablePositions});
    refetch();
  }

  return (
    <div className="foodcourt-module">
      <div className="btn-wrapper">
        <h3>
          Aktualnie zarządzasz restauracją <span>{restaurant.name}</span>
        </h3>
        <Button>Dodaj stolik</Button>
        <Button onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Wyłącz edycję sali" : "Włącz edycję sali"}
        </Button>
        <Button variant="success" onClick={saveHandler}>Zapisz</Button>
      </div>
      <div className="foodcourt-wrapper">
        <div className="foodcourt">
          {tablePositions?.map((item) => (
            <Draggable
              key={`table-${item.id}`}
              onDrag={(e, dragData) => onDrag(e, item.id, dragData)}
              disabled={!isEdit}
              bounds="parent"
            >
              <div
                className="table"
                id={item.id}
                style={{
                  top: item.y + "px",
                  left: item.x + "px",
                }}
              >
                <h5>{item.capacity} osobowy</h5>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Foodcourt;