import "./styles.scss";
import AddRestaurant from "./AddRestaurant/AddRestaurant";
import EditRestaurant from "./EditRestaurant/EditRestaurant";

const AddEditRestaurant = ({restaurantData, userId}) => {
  if(restaurantData) {
    return (
      <div className="add-edit-restaurant">
      <h3>Edytuj restaurację</h3>
      <div className="add-edit-wrapper">
        <EditRestaurant restaurantData={restaurantData}/>
      </div>
    </div>
    )
  }
  return (
    <div className="add-edit-restaurant">
      <h3>Dodaj restaurację</h3>
      <div className="add-edit-wrapper">
        <AddRestaurant userId={userId} />
      </div>
    </div>
  )
};

export default AddEditRestaurant;