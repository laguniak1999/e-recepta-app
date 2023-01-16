const sql = require("./DatabaseConnector.js");

// constructor
const User = function (user) {
  this.user_id = user.user_id;
  this.pesel = user.pesel;
  this.name = user.name;
  this.surname = user.surname;
  this.address_id = user.address_id;
  this.type_id = user.type_id;
  this.gender = user.gender;
  this.date_of_birth = user.date_of_birth;
};

User.create = (new_user, result) => {
  sql.query(
    "INSERT INTO użytkownicy (id_użytkownika, pesel, imie, nazwisko, id_adresu, id_typu, plec, data_urodzenia) SELECT ?,?,?,?,MAX(adresy.id_adresu),1,?,? FROM adresy",
    [
      new_user.user_id,
      new_user.pesel,
      new_user.name,
      new_user.surname,
      new_user.gender,
      new_user.date_of_birth.replace("-", "").replace("-", ""),
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, { ...new_user });
    }
  );
};

User.getAllUsers = (result) => {
  let query = "SELECT * FROM użytkownicy;";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

User.getUser = (id, result) => {
  let query = `SELECT *  
    FROM użytkownicy 
    INNER JOIN adresy ON użytkownicy.id_adresu=adresy.id_adresu
    WHERE id_użytkownika = "${id}";`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = User;
