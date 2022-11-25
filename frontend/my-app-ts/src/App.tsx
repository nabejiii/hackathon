import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SignIn from "./SignIn/Login";
import SignUp from "./SignUp/SignUp"
import Home from './UserPage/Home/HomePage';
import {UserProvider} from './UserProvider'
import SendPage from './UserPage/Send/SendPage'
import Members from './UserPage/Member/MemberPage';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">

          <Routes>
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="home" element={<Home />} />
            <Route path="send" element={<SendPage />} />
            <Route path="members" element={<Members />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}
