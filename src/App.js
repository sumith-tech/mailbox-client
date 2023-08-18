import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Homepage from "./Components/Pages/Homepage";
import "./App.css";
import Footer from "./Components/Layouts/Footer";
import Mailbox from "./Components/Pages/Mailbox";
import { useSelector } from "react-redux";
import Inbox from "./Components/Pages/Inbox";
import Sent from "./Components/Pages/Sent";

const App = () => {
  const isLoggin = useSelector((state) => state.auth.email);
  console.log(isLoggin);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isLoggin && <Route path="/" element={<Homepage />}></Route>}
          {isLoggin && <Route path="/mailbox" element={<Mailbox />}></Route>}
          {isLoggin && <Route path="/inbox" element={<Inbox />}></Route>}
          {isLoggin && <Route path="/sent" element={<Sent />}></Route>}
          {!isLoggin && <Route path="/signup" element={<SignUp />}></Route>}
          {!isLoggin && <Route path="/login" element={<Login />}></Route>}
          {isLoggin && <Route path="*" element={<Homepage />}></Route>}
          {!isLoggin && <Route path="*" element={<Login />}></Route>}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
