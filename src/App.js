import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root";
import UserProvider from "./provider/UserProvider";
import { LoadScript } from "@react-google-maps/api";

function App() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}>
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            <Root />
          </div>
        </BrowserRouter>
      </UserProvider>
    </LoadScript>
  );
}

export default App;
