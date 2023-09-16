import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root";
import UserProvider from "./provider/UserProvider";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Root />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
