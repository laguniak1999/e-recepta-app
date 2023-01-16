import React, { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import "./PagesElements.css";
import Login from "./Login.js";

const Add = () => {
  // Hook useState zwracający tablicę z dwoma elementami
  const [medicineId, setMedicineId] = useState("");
  const [patientId, setPatientId] = useState("");

  const [patientName, SetPatientName] = useState("");
  const [patientSurname, SetPatientSurname] = useState("");
  const [patientPesel, SetPatientPesel] = useState("");
  const [patientCity, SetPatientCity] = useState("");
  const [patientStreet, SetPatientStreet] = useState("");
  const [patientHouseNumber, SetPatientHouseNumber] = useState("");
  const [patientGender, SetPatientGender] = useState("");
  const [patientDateOfBirth, SetPatientDateOfBirth] = useState("");

  const [usageDescription, setUsageDescription] = useState("");

  const [doctorId, setDoctorId] = useState("");

  const [medicineAmount, setMedicineAmount] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [userInformations, setUserInformations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [medicineInformations, setMedicineInformations] = useState([]);
  const [prescriptionPaperVersion, setPrescriptionPaperVersion] = useState([]);

  const submitStatus = () => {
    setDoctorId(2);
    Axios.post("http://localhost:3001/api/add", {
      usage: usageDescription,
      medicine_id: medicineId,
      patient_id: patientId,
      doctor_id: doctorId,
      medicine_amount: medicineAmount,
    }).then((res) => {
      alert("succesful insert");
      setTimeout(() => {
        getDocument("recepta_wypelniona_podpisana.xml");
      }, 1000);
    });
  };

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
      getUsers();
    });
  };

  const javaTest = (document) => {
    Axios.post("http://localhost:8080/api/send", {
      prescriptionDocument: document,
    }).then((res) => {
      alert(res.data);
    });
  };

  const getPrescriptionSearchData = () => {
    Axios.post("http://localhost:8080/api/test3", {}).then((res) => {
      console.log(res.data);
    });
  };

  const submitMedicine = (selectedOption) => {
    console.log(selectedOption);
    Axios.post("http://localhost:3001/api/add/" + { selectedOption }, {
      id: selectedOption,
    }).then((res) => {
      setMedicineId(res.data[0].id_lekarstwa);
      console.log(res.data);
      setMedicineInformations(res.data);
    });
  };
  useEffect(() => {
    getMedicines();
    getUsers();
    setTimeout(() => {
      submitMedicine(1);
      submitUser(1);
    }, 1000);
  }, []);
  const getMedicines = () => {
    Axios.get("http://localhost:3001/api/add", {}).then((res) => {
      setMedicines(res.data);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/api/user", {}).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  };

  const submitUser = (selectedOption) => {
    Axios.post("http://localhost:3001/api/user/" + { selectedOption }, {
      id: selectedOption,
    }).then((res) => {
      console.log(res.data);
      setUserInformations(res.data);
      setPatientId(res.data[0].id_użytkownika);
    });
  };

  const getDocument = (selectedOption) => {
    console.log(selectedOption);
    Axios.post("http://localhost:3001/api/add/document/" + { selectedOption }, {
      selectedOption: selectedOption,
    }).then((res) => {
      javaTest(res.data);
    });
  };

  let MedicineList = medicines.map((medicine, i) => {
    return (
      <option key={i} value={medicine.id_lekarstwa}>
        {medicine.nazwa}
      </option>
    );
  }, this);

  let UserList = users.map((user, i) => {
    return (
      <option key={i} value={user.id_użytkownika}>
        {user.nazwisko}
      </option>
    );
  }, this);

  return (
    <div className="App">
      <div className="paperVersion" id="log"></div>
      <header class="page_header">
        <div class="overlay">
          <h1>Wyślij Receptę</h1>
        </div>
      </header>
      <div class="form__group field">
        <input
          placeholder="Opis stosowania"
          required
          class="form__field"
          type="text"
          name="usage_description"
          onChange={(e) => {
            setUsageDescription(e.target.value);
          }}
        />
        <label class="form__label">Opis stosowania</label>
      </div>
      <div class="form__group field">
        <input
          placeholder="Ilość leku"
          required
          class="form__field"
          type="text"
          name="ilosc_leku"
          onChange={(e) => {
            setMedicineAmount(e.target.value);
          }}
        />
        <label class="form__label">Ilość leku</label>
      </div>
      <div class="medicine_select">
        <select
          value={null}
          onChange={(e) => {
            submitMedicine(e.target.value);
          }}
        >
          {MedicineList}
        </select>
      </div>
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
      {console.log(medicineInformations)}
      {medicineInformations &&
        medicineInformations.map((information) => (
          <div class="st_wrap_table" data-table_id="1">
            <header class="st_table_header">
              <h1>Lekarstwa</h1>
            </header>
            <div class="st_table">
              <div class="st_row">
                <div class="st_column _name">Nazwa lekarstwa</div>
                <div class="st_column _value">{information.nazwa}</div>
              </div>
              <div class="st_row">
                <div class="st_column _name">numer EAN</div>
                <div class="st_column _value">{information.EAN}</div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Postać</div>
                <div class="st_column _value">{information.postac}</div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Dawka</div>
                <div class="st_column _value">
                  {information.dawka}
                  {information.jednostka_dawki}
                </div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Cena</div>
                <div class="st_column _value">
                  {information.cena_detaliczna}
                </div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Substancja czynna</div>
                <div class="st_column _value">
                  {information.substancja_czynna}
                </div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Zawartość opakowania</div>
                <div class="st_column _value">
                  {information.zawartosc_opakowania}
                </div>
              </div>
            </div>
          </div>
        ))}
      {userInformations &&
        userInformations.map((information) => (
          <div class="st_wrap_table" data-table_id="2">
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
                <div class="st_column _value">{information.data_urodzenia}</div>
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

      <div id="container">
        <button class="send-prescription" onClick={submitStatus}>
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <span class="button-text">Wyślij receptę</span>
        </button>
      </div>
    </div>
  );
};

export default Add;
