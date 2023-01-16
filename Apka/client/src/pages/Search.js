import React, { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import "./PagesElements.css";

const Search = () => {
  const [pesel, setPesel] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [product_name, setProductName] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionInformations, setPrescriptionInformations] = useState([]);

  const getPrescriptionSearchData = () => {
    Axios.post("http://localhost:8080/api/search", {
      pesel: pesel,
      startDate: start_date,
      endDate: end_date,
      productName: product_name,
    }).then((res) => {
      setPrescriptions(res.data);
      alert("Wyszukiwanie recept powiodło się!")
    });
  };

  const anulowanieTest = () => {
    Axios.post("http://localhost:8080/api/cancel", {
      prescription_key: prescriptionInformations.prescriptionKey,
    }).then((res) => {
      if (res) {
        prescriptionInformations.prescriptionStatus = "ANULOWANA";
      }
    });
  };

  let PrescriptionList = prescriptions.map((prescription, i) => {
    console.log(prescription);
    return (
      <option key={i} value={i}>
        {prescription.name}
      </option>
    );
  }, this);

  return (
    <div className="App">
      <header class="page_header">
        <div class="overlay">
          <h1>Wyszukaj Receptę</h1>
        </div>
      </header>
      <div class="search_inputs_wraper">
        <div class="form__group field">
          <input
            placeholder="Pesel"
            required
            class="form__field"
            type="text"
            name="pesel"
            onChange={(e) => {
              setPesel(e.target.value);
            }}
          />
          <label class="form__label">Pesel</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Data od"
            required
            class="form__field"
            type="date"
            name="start_date"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
          <label class="form__label">Data od</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Data do"
            required
            class="form__field"
            type="date"
            name="end_date"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
          <label class="form__label">Data do</label>
        </div>
        <div class="form__group field">
          <input
            placeholder="Nazwa leku"
            required
            class="form__field"
            type="text"
            name="product_name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <label class="form__label">Nazwa leku</label>
        </div>
      </div>
      <div class="table_with_select">
        <div className="search_select">
          <select
            value={null}
            onClick={(e) => {
              setPrescriptionInformations(prescriptions[e.target.value]);
            }}
          >
            {PrescriptionList}
          </select>
        </div>
        {prescriptionInformations != null && (
          <div class="st_wrap_table" data-table_id="3">
            <header class="st_table_header">
              <h1>Recepta</h1>
            </header>
            <div class="st_table">
              <div class="st_row">
                <div class="st_column _name">Kod EAN</div>
                <div class="st_column _value">
                  {prescriptionInformations.codeEAN}
                </div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Nazwa leku</div>
                <div class="st_column _value">
                  {prescriptionInformations.name}
                </div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Ilość opakowań</div>
                <div class="st_column _value">
                  {prescriptionInformations.numberOfMedicinePackages}
                </div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Data</div>
                <div class="st_column _value">
                  {prescriptionInformations.signingData}
                </div>
              </div>
              <div class="st_row">
                <div class="st_column _name">Status recepty</div>
                <div class="st_column _value">
                  {prescriptionInformations.prescriptionStatus}
                </div>
              </div>
            </div>
          </div>
        )}
        <div class="search_button">
          <button class="send-prescription" onClick={getPrescriptionSearchData}>
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">Szukaj</span>
          </button>
        </div>
        <div class="delete_button">
          <button class="send-prescription" onClick={anulowanieTest}>
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">Anuluj receptę</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
