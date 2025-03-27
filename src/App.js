import "./App.css";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import React, { useState } from 'react';
// import About from "./components/About";
import Alert from "./components/Alert";
// import {BrowserRouter as Router, 
// Route,
// Routes
// } from "react-router-dom";
function App() {
  const [mode, setmode] = useState("light");
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      document.title = "TextUtils - Dark Mode";
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
    } else {
      document.title = "TextUtils - light Mode";
      setmode("light");
      document.body.style.backgroundColor = "white";
      showAlert("light mode has been enabled", "success");
    }
  };
  return (
    <>
    {/* <Router> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">
{/* <Routes>
    <Route exact path="/about" element={<About />} />
    <Route exact path="/" element={  */}
      <Textform showAlert={showAlert} heading="Enter the text to analyze" mode={mode}/>
      {/* // }/> */}
  {/* </Routes> */}
      </div>
      {/* </Router> */}
    </>
  );
}

export default App;
