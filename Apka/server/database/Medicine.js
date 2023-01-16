const sql = require("./DatabaseConnector.js");

// konstruktor
const Medicine = function(medicine) {
    this.id_lekarstwa = medicine.medicine_id;
    this.EAN = medicine.EAN;
    this.jednostka_dawki = medicine.dose_unit;
    this.dawka = medicine.dose;
    this.substancja_czynna = medicine.active_substance;
    this.nazwa = medicine.name;
    this.postac = medicine.form;
    this.zawartosc_opakowania = medicine.package_contents;
    this.rodzaj_leku = medicine.medicine_type;
    this.urzedowa_cena_zbytu = medicine.offcial_price;
    this.cena_hurtowa_brutto = medicine.gross_price;
    this.cena_detaliczna = medicine.retail_price;
    this.wysokosc_limitu_finansowania = medicine.funding_limit_amount;
    this.doplata_swiadczeniobiorcy = medicine.surcharge_beneficiary;
    this.poziom_odplatnosci = medicine.payment_level;
    this.lista_refundacyjna = medicine.refund_list;
    this.wskazania = medicine.indications;
  };

  Medicine.getAll = (id, result) => {
    let query = "SELECT * FROM lekarstwa";

    if (id) {
        query += ` WHERE id_lekarstwa LIKE '${id}'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
          result(null, res);
    });
  };

  module.exports = Medicine;
