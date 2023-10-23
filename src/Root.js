import Navigation from "./modules/Navigation/Navigation";
import Profile from "./pages/Profile";
import MainPage from "./pages/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";
import Reservation from "./pages/Reservation/Reservation";
import LoginRegister from "./pages/LoginRegister";
import Register from "./pages/LoginRegister/Register/Register";
import Login from "./pages/LoginRegister/Login/Login";
import { useUserContext } from "./provider/hooks/useUserContext";
import { useEffect } from "react";
import ReservationSingle from "./pages/Reservation/ReservationSingle/ReservationSingle";
import Contact from "./pages/Contact/Contact";
import Partnership from "./pages/Partnership/Partnership";

const Root = () => {
  const { isLogged, userData, isLoggedIn } = useUserContext();
  
  useEffect(() => {
    isLoggedIn()
  }, [])
  return (
    <>
      <Navigation isLogged={isLogged} user={userData}/>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <MainPage/>
            </>
          }
        />
        <Route exact path="/reservation" element={<Reservation />} />
        <Route
          exact
          path="/register"
          element={
            <LoginRegister>
              <Register />
            </LoginRegister>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <LoginRegister>
              <Login />
            </LoginRegister>
          }
        />
        <Route exact path="/profile/*" element={<Profile />} />
        <Route exact path="/reservation/:id" element={<ReservationSingle/>}/>
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/partnership" element={<Partnership/>} />
      </Routes>
    </>
  );
};

export default Root;
