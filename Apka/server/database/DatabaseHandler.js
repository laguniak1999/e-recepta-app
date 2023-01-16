const mysql = require("mysql");
const sql = require("./DatabaseConnector.js");
const Prescription = require("./Prescription.js");
const DetailedPrescription = require("./DetailedPrescription.js");
const Medicine = require("./Medicine.js");
const User = require("./User.js");
const Address = require("./Address.js");
const moment = require("moment");
const crypto = require("crypto");
const {
  setPrescriptionDocumentValues,
} = require("./../PrescriptionDocumentHandler.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let prescription_number = crypto
    .randomUUID()
    .replaceAll("-", "")
    .toUpperCase()
    .substring(0, 22);
  let prescription_date = moment(new Date()).format("yyyyMMDDHHmmss");

  // Utwórz obiekt klasy Prescription
  const prescription = new Prescription({
    prescription_key: req.body.prescription_key || null,
    prescription_status: "DODANA",
    medicine_id: req.body.medicine_id,
    usage: req.body.usage,
    medicine_amount: req.body.medicine_amount,
    doctor_id: req.body.doctor_id || null,
    patient_id: req.body.patient_id || null,
    prescription_number_ext_out: req.body.prescription_number_ext_out || null,
    prescription_root: req.body.prescription_root || null,
    prescription_number: prescription_number,
    prescription_date: prescription_date,
  });

  // Zapisz receptę w bazie danych
  Prescription.create(prescription, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recepta.",
      });
    else {
      res.send(data);
      setPrescriptionDocumentValues();
    }
  });
};
// Usuń wszystkie recepty w bazie danych
exports.deleteAll = (req, res) => {
  Prescription.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Recepta.",
      });
    else res.send({ message: `All Recepta were deleted successfully!` });
  });
};

exports.getAll = (req, res) => {
  const id = req.body.id;
  Medicine.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while taking all medicines.",
      });
    else {
      res.send(data);
    }
  });
};

exports.createUser = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Utwórz obiekt klasy Address
  const address = new Address({
    address_id: req.body.address_id || null,
    city: req.body.city,
    street: req.body.street,
    house_number: req.body.house_number,
  });

  // Save Address in the database
  Address.create(address, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address.",
      });
    else {
    }
  });

  // Create an User
  const user = new User({
    user_id: req.body.user_id || null,
    pesel: req.body.pesel,
    name: req.body.name,
    surname: req.body.surname,
    address_id: req.body.address_id,
    type_id: 1,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while taking all packages.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getUser = (req, res) => {
  const id = req.body.id;
  User.getUser(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while taking all prescriptions from package.",
      });
    else {
      res.send(data);
    }
  });
};
