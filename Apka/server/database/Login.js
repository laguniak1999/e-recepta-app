const sql = require("./DatabaseConnector.js");

exports.logIn = (req, res) => {
  // Przechwycenie wprowadzonych danych
  let username = req.body.name;
  let password = req.body.surname;
  // Sprawdzenie czy dane istnieją i są poprawne 
  if (username && password) {
    // Wywołanie zapytania SQL do sprawdzenia czy dane są w bazie danych
    sql.query(
      `SELECT * FROM użytkownicy 
      INNER JOIN typy ON użytkownicy.id_użytkownika=typy.id_typu
    WHERE imie = ? AND nazwisko = ? AND typ_użytkownika = "LEKARZ";`,
      [username, password],
      function (error, results, fields) {
        // Jeśli jest coś nie tak zwróć błąd
        if (error) throw error;
        // Jeśli konto istnieje
        if (results.length > 0) {
          res.send("loggedin");
        } else {
          res.send("Niepoprawne dane logowania!");
        }
        res.end();
      }
    );
  } else {
    res.send("Wprowadź imię oraz nazwisko!");
    res.end();
  }
};
