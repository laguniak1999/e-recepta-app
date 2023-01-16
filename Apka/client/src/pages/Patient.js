import React, { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import "./PagesElements.css";

const Patient = () => {
  const [patientName, SetPatientName] = useState("");
  const [patientSurname, SetPatientSurname] = useState("");
  const [patientPesel, SetPatientPesel] = useState("");
  const [patientCity, SetPatientCity] = useState("");
  const [patientStreet, SetPatientStreet] = useState("");
  const [patientHouseNumber, SetPatientHouseNumber] = useState("");
  const [patientGender, SetPatientGender] = useState("");
  const [patientDateOfBirth, SetPatientDateOfBirth] = useState("");

  const [users, setUsers] = useState([]);
  const [userInformations, setUserInformations] = useState([]);

  const addUser = () => {
    Axios.post("http://localhost:3001/api/user", {
      name: patientName,
      surname: patientSurname,
      pesel: patientPesel,
      city: patientCity,
      street: patientStreet,
      house_number: patientHouseNumber,
      gender: patientGender,
      date_of_birth: patientDateOfBirth,
    }).then((res) => {
      console.log(res);
      getUsers();
    });
  };

  const submitUser = (selectedOption) => {
    Axios.post("http://localhost:3001/api/user/" + { selectedOption }, {
      id: selectedOption,
    }).then((res) => {
      console.log(res.data);
      setUserInformations(res.data);
      //   setIdUslugobiorcy(res.data[0].id_użytkownika);
    });
  };
  useEffect(() => {
    getUsers();
    setTimeout(() => {
      submitUser(1);
    }, 1000);
  }, []);

  const getUsers = () => {
    Axios.get("http://localhost:3001/api/user", {}).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  };

  let UserList = users.map((user, i) => {
    return (
      <option key={i} value={user.id_użytkownika}>
        {user.nazwisko}
      </option>
    );
  }, this);

  return (
    <div className="App">
      <header class="page_header">
        <div class="overlay">
          <h1>Dodaj Pacjenta</h1>
        </div>
      </header>
      <div class="inputs_wraper">
        <div class="form__group field">
          <input
            placeholder="Imię"
            required
            class="form__field"
            type="text"
            name="patient_name"
            onChange={(e) => {
              SetPatientName(e.target.value);
            }}
          />
          <label class="form__label">Imię</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Nazwisko"
            required
            class="form__field"
            type="text"
            name="patient_surname"
            onChange={(e) => {
              SetPatientSurname(e.target.value);
            }}
          />
          <label class="form__label">Nazwisko</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Pesel"
            required
            class="form__field"
            type="text"
            name="patient_pesel"
            onChange={(e) => {
              SetPatientPesel(e.target.value);
            }}
          />
          <label class="form__label">Pesel</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Miasto"
            required
            class="form__field"
            type="text"
            name="patient_city"
            onChange={(e) => {
              SetPatientCity(e.target.value);
            }}
          />
          <label class="form__label">Miasto</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Ulica"
            required
            class="form__field"
            type="text"
            name="patient_street"
            onChange={(e) => {
              SetPatientStreet(e.target.value);
            }}
          />
          <label class="form__label">Ulica</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Numer domu"
            required
            class="form__field"
            type="text"
            name="patient_house_number"
            onChange={(e) => {
              SetPatientHouseNumber(e.target.value);
            }}
          />
          <label class="form__label">Numer domu</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Płeć"
            required
            class="form__field"
            type="text"
            name="patient_gender"
            onChange={(e) => {
              SetPatientGender(e.target.value);
            }}
          />
          <label class="form__label">Płeć</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Data urodzenia"
            required
            class="form__field"
            type="date"
            name="patient_date_of_birth"
            onChange={(e) => {
              SetPatientDateOfBirth(e.target.value);
            }}
          />
          <label class="form__label">Data urodzenia</label>
        </div>
      </div>
      <div class="table_with_select">
        <div className="user_select">
          <select
            value={null}
            onChange={(e) => {
              submitUser(e.target.value);
            }}
          >
            {UserList}
          </select>
        </div>
        {userInformations &&
          userInformations.map((information) => (
            <div class="st_wrap_table" data-table_id="4">
              <header class="st_table_header">
                <h1>Pacjenci</h1>
              </header>
              <div class="st_table">
                <div class="st_row">
                  <div class="st_column _name">Imię</div>
                  <div class="st_column _value">{information.imie}</div>
                </div>
                <div class="st_row">
                  <div class="st_column _name">Nazwisko</div>
                  <div class="st_column _value">{information.nazwisko}</div>
                </div>
                <div class="st_row">
                  <div class="st_column _name">Pesel</div>
                  <div class="st_column _value">{information.pesel}</div>
                </div>
                <div class="st_row">
                  <div class="st_column _name">Płeć</div>
                  <div class="st_column _value">{information.plec}</div>
                </div>
                <div class="st_row">
                  <div class="st_column _name">Data urodzenia</div>
                  <div class="st_column _value">
                    {information.data_urodzenia}
                  </div>
                </div>
                <div class="st_row">
                  <div class="st_column _name">Miasto</div>
                  <div class="st_column _value">{information.miasto}</div>
                </div>
                <div class="st_row">
                  <div class="st_column _name">Ulica</div>
                  <div class="st_column _value">
                    {information.ulica} <span></span>
                    {information.numer_domu}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div class="user_button">
        <button class="send-prescription" onClick={addUser}>
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <span class="button-text">Dodaj użytkownika</span>
        </button>
      </div>
    </div>
  );
};

export default Patient;
