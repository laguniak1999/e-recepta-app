const sql = require("./DatabaseConnector.js");

// konstruktor
const DetailedPrescription = function (detailedPrescription) {};

DetailedPrescription.getAllPrescriptionValues = (result) => {
  let query = `SELECT id_użytkownika, pesel as uslugobiorca_pesel, imie as uslugobiorca_imie, nazwisko as uslugobiorca_nazwisko, PWZ as uslugobiorca_PWZ, id_pracownika_ext as uslugobiorca_id_pracownika_ext, id_podmiotu as uslugobiorca_id_podmiotu, id_lokalne_podmiotu as uslugobiorca_id_lokalne_podmiotu, root_uslugobiorcy as uslugobiorca_root_uslugobiorcy, plec as uslugobiorca_plec, data_urodzenia as uslugobiorca_data_urodzenia, miasto as uslugobiorca_miasto, ulica as uslugobiorca_ulica, numer_domu as uslugobiorca_numer_domu, id_miejsca_pracy_ext as uslugobiorca_id_miejsca_pracy_ext, regon_14 as uslugobiorca_regon_14
  from użytkownicy
INNER JOIN typy ON typy.id_typu=użytkownicy.id_typu 
INNER JOIN adresy ON adresy.id_adresu=użytkownicy.id_adresu
  INNER JOIN recepty ON użytkownicy.id_użytkownika=recepty.id_uslugobiorcy
WHERE typ_użytkownika="PACJENT"
ORDER BY recepty.id_recepty DESC
LIMIT 1;
SELECT id_użytkownika, pesel as lekarz_pesel, imie as lekarz_imie, nazwisko as lekarz_nazwisko, PWZ as lekarz_PWZ, id_pracownika_ext as lekarz_id_pracownika_ext, id_podmiotu as lekarz_id_podmiotu, id_lokalne_podmiotu as lekarz_id_lokalne_podmiotu, root_uslugobiorcy as lekarz_root_uslugobiorcy, plec as lekarz_plec, data_urodzenia as lekarz_data_urodzenia, miasto as lekarz_miasto, ulica as lekarz_ulica, numer_domu as lekarz_numer_domu, id_miejsca_pracy_ext as lekarz_id_miejsca_pracy_ext, regon_14 as lekarz_regon_14
from użytkownicy
INNER JOIN typy ON typy.id_typu=użytkownicy.id_typu 
INNER JOIN adresy ON adresy.id_adresu=użytkownicy.id_adresu
INNER JOIN recepty ON użytkownicy.id_użytkownika=recepty.id_lekarza
WHERE typ_użytkownika="LEKARZ"
ORDER BY recepty.id_recepty DESC
LIMIT 1;
SELECT *
    from recepty
    INNER JOIN lekarstwa ON recepty.id_lekarstwa=lekarstwa.id_lekarstwa 
	ORDER BY recepty.id_recepty DESC
	LIMIT 1;
`;
  sql.query(query, [1, 2, 3], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(res);
  });
};

module.exports = DetailedPrescription;
