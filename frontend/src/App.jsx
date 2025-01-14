import React, { useState, Suspense, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/user";
import BuyLogout from "./components/Buylogout";
const Home = React.lazy(() => import("./components/Home"));
const Profile = React.lazy(() => import("./components/Profile"));
const Buy = React.lazy(() => import("./components/Buy"));
const Sell = React.lazy(() => import("./components/Sell"));
const Credits = React.lazy(() => import("./components/Credits"));
const Login = React.lazy(() => import("./components/Login"));

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState();
  const [uuid, setUUID] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const userCtx = useContext(UserContext);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{
            accessToken,
            setAccessToken,
            uuid,
            setUUID,
            role,
            setRole,
            username,
            setUsername,
          }}
        >
          <Navbar></Navbar>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route
                path="/profile"
                element={accessToken ? <Profile></Profile> : <Login></Login>}
              ></Route>
              <Route
                path="/buy"
                element={accessToken ? <Buy></Buy> : <BuyLogout></BuyLogout>}
              ></Route>
              <Route
                path="/sell"
                element={accessToken ? <Sell></Sell> : <Login></Login>}
              ></Route>
              <Route
                path="/credits"
                element={accessToken ? <Credits></Credits> : <Login></Login>}
              ></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
          </Suspense>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
