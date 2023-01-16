import React, { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import "./PagesElements.css";

const PaperVersion = () => {
  const [prescriptionDocument, setPrescriptionDocument] = useState([]);

  const getDocument = (selectedOption) => {
    console.log(selectedOption);
    Axios.post("http://localhost:3001/api/add/document/" + { selectedOption }, {
      selectedOption: selectedOption,
    }).then((res) => {
      getPaperVersion(res.data);
    });
  };
 
  const getPaperVersion = (data) => {
    Axios.post("http://localhost:8080/api/paper", {
      prescriptionDocument: data,
    }).then((res) => {
      document.getElementById("log").innerHTML = res.data;
    });
  };
  useEffect(() => {
    getDocument("recepta_wersja_papierowa.xml");
    setTimeout(() => {}, 10000);
  }, []);

  return (
    <div className="App">
      <div className="paperVersion" id="log"></div>
    </div>
  );
};

export default PaperVersion;
