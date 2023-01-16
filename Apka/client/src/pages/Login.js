import React, { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import "./PagesElements.css";

const Login = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/api/login", {
      name: name,
      surname: surname,
    }).then((res) => {
      console.log(res.data);
      if (res.data == "loggedin") {
        window.location = "/Add";
      } else {
        alert("Wprowadzono niepoprawne dane logowania!");
      }
    });
  };

  return (
    <div className="App">
      <header class="login_page_header">
        <div class="overlay">
          <h1>E-RECEPTA</h1>
        </div>
      </header>
      <div class="box">
        <form>
          <span class="text-center">login</span>
          <div class="input-container">
            <input
              type="text"
              required=""
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label>Imię</label>
          </div>
          <div class="input-container">
            <input
              type="text"
              required=""
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
            <label>Nazwisko</label>
          </div>
          <button onClick={login} type="button" class="btn">
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
