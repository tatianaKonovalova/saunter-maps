import React from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <HomePage />
      <ToastContainer />
    </>
  );
}

export default App;
