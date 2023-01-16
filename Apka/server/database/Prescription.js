const sql = require("./DatabaseConnector.js");

// constructor
const Prescription = function (prescription) {
  this.klucz_recepty = prescription.prescription_key;
  this.status_recepty = prescription.prescription_status;
  this.id_lekarstwa = prescription.medicine_id;
  this.ilosc_leku = prescription.medicine_amount;
  this.stosowanie = prescription.usage;
  this.id_lekarza = prescription.doctor_id;
  this.id_uslugobiorcy = prescription.patient_id;
  this.numer_recepty_ext_out = prescription.prescription_number_ext_out;
  this.root_recepty = prescription.prescription_root;
  this.numer_recepty = prescription.prescription_number;
  this.data_wystawienia = prescription.prescription_date;
};

Prescription.create = (new_prescription, result) => {
  sql.query("INSERT INTO recepty SET ?", new_prescription, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { ...new_prescription });
  });
};

Prescription.removeAll = (result) => {
  sql.query("DELETE FROM recepty", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Prescription;
