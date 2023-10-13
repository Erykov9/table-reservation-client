import { useState, useEffect } from "react";
import "./Foodcourt.scss";
import { useParams } from "react-router-dom";
import { useRestaurants } from "../../OdevFetch";
import { Spinner } from "react-bootstrap";
import Button from "../../components/Button/Button";
import Draggable from "react-draggable";
import { useTables } from "../../OdevFetch";
import StatusDisplay from "../../components/StatusDisplay/StatusDisplay";
import Modal from "../../modules/Modal/Modal";
import AddTable from "./AddTable/AddTable";
import FoodcourtVisiting from "./FoodcourtVisiting/FoodcourtVisiting";

const Foodcourt = ({ isVisiting = false }) => {
  const { id } = useParams();
  const { payload, loading } = useRestaurants({ query: id });
  const {
    payload: tablePayload,
    loading: tableLoading,
    save,
    refetch,
    remove,
  } = useTables({ id });

  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState({
    status: undefined,
    message: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState({
    isOpen: false,
    data: {},
  });
  const [tablePositions, setTablePositions] = useState([]);

  useEffect(() => {
    if (!tableLoading) {
      setTablePositions(tablePayload?.data?.results);
    }
  }, [tableLoading]);

  const onDrag = (e, id, dragData) => {
    const { x, y } = dragData;
    const draggedTableIndex = tablePositions.findIndex(
      (item) => item.id === id
    );

    if (draggedTableIndex !== -1) {
      const newPosition = { ...tablePositions[draggedTableIndex] };
      newPosition.x = x;
      newPosition.y = y;

      const newTablePositions = [...tablePositions];
      newTablePositions[draggedTableIndex] = newPosition;

      setTablePositions(newTablePositions);
    }
  };

  if (loading) return <Spinner></Spinner>;
  const restaurant = payload?.data?.results;
  const restaurantName = restaurant?.filter((item) => item.id == id);

  const saveHandler = async () => {
    const output = await save({ body: tablePositions });
    setStatus({
      status: output.status,
      message: output.message,
    });

    if (output.status === "success") {
      refetch();
    }

    setTimeout(() => {
      setStatus({
        status: undefined,
        message: "",
      });
    }, 2500);
  };

  if (isVisiting) {
    return (
      <>
        <FoodcourtVisiting
          restaurant={restaurantName}
          tablePositions={tablePositions || []}
        />
      </>
    );
  }

  return (
    <div className="foodcourt-module">
      <h3>
        Aktualnie zarządzasz restauracją <span>{restaurantName[0]?.name}</span>
      </h3>
      {<StatusDisplay status={status.status}>{status.message}</StatusDisplay>}
      <div className="btn-wrapper">
        <Button onClick={() => setOpenModal(true)}>Dodaj stolik</Button>
        <Button onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Wyłącz edycję sali" : "Włącz edycję sali"}
        </Button>
        <Button variant="success" onClick={saveHandler}>
          Zapisz
        </Button>
      </div>
      <div className="foodcourt-wrapper">
        <div className="foodcourt">
          {tablePositions?.map((item) => (
            <Draggable
              key={`table-${item.id}`}
              onDrag={(e, dragData) => onDrag(e, item.id, dragData)}
              disabled={!isEdit}
              position={{ x: item.x, y: item.y }}
              bounds="parent"
            >
              <div
                className="table"
                id={item.id}
                onClick={() =>
                  setOpenEditModal(
                    !isEdit && {
                      isOpen: true,
                      data: item,
                    }
                  )
                }
              >
                <h5>Numer stolika: {item.table_number}</h5>
                <h5>{item.capacity} osobowy</h5>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <AddTable
            restaurantId={id}
            save={save}
            refetch={refetch}
            onClose={() => setOpenModal(false)}
          />
        </Modal>
      )}
      {openEditModal.isOpen && (
        <Modal
          onClose={() =>
            setOpenEditModal({
              isOpen: false,
              data: {},
            })
          }
        >
          <AddTable
            save={save}
            refetch={refetch}
            onClose={() =>
              setOpenEditModal({
                isOpen: false,
                data: {},
              })
            }
            data={openEditModal.data}
            remove={remove}
          />
        </Modal>
      )}
    </div>
  );
};

export default Foodcourt;
