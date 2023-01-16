const sql = require("./DatabaseConnector.js");

// konstruktor
const Address = function (address) {
  this.miasto = address.city;
  this.ulica = address.street;
  this.numer_domu = address.house_number;
};

Address.create = (newAddress, result) => {
  sql.query("INSERT INTO adresy SET ?", newAddress, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result();
  });
};

module.exports = Address;
