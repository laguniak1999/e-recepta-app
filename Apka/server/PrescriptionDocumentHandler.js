const fs = require("fs");
var DOMParser = require("xmldom").DOMParser;
const xml2js = require("xml2js");
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const moment = require("moment");
const crypto = require("crypto");
let java = require("java");
java.classpath.push("podpisKwalifikowany-1.4.19.jar");
const exec = require("child_process").exec;
const DetailedPrescription = require("./database/DetailedPrescription");
prescription_schema =
  "C:/Users/Damian/Desktop/inżynierka/cache/recepta-poprawna-schema.xml";
prescription_schema_paper_version =
  "C:/Users/Damian/Desktop/inżynierka/cache/recepta-wersja-papierowa-schema.xml";
prescription_dst =
  "C:/Users/Damian/Desktop/inżynierka/cache/recepta-wypelniona.xml";
prescription_paper_version_dst =
  "C:/Users/Damian/Desktop/inżynierka/cache/recepta_wersja_papierowa.xml";
signed_prescription_dst = "C:/Users/Damian/Desktop/inżynierka/cache/";

function setPrescriptionDocumentValues() {
  DetailedPrescription.getAllPrescriptionValues(function (result) {
    parseXml(prescription_schema, prescription_dst, result);
    parseXml(
      prescription_schema_paper_version,
      prescription_paper_version_dst,
      result
    );
  });
}

function parseXml(prescription, prescription_dst, result) {
  let prescription_string = fs.readFileSync(prescription, "utf8");
  for (let i = 0; i < result.length; i++) {
    Object.entries(result[i][0]).forEach(([key, value]) => {
      prescription_string = setPrescriptionValues(
        prescription_string,
        key,
        value
      );
    });
  }

  fs.writeFile(prescription_dst, prescription_string, function (err) {
    console.log(err);
  });
  signDocument();
}

function setPrescriptionValues(prescription_string, old_value, new_value) {
  var old_value = "@@" + old_value + "@@";
  old_value = new RegExp(old_value, "gi");

  console.log(old_value);
  prescription_string = prescription_string.replace(old_value, new_value);
  return prescription_string;
}

function getPrescriptionDocument(prescription_name) {
  let prescription_string = fs.readFileSync(
    signed_prescription_dst + prescription_name,
    "utf8"
  );
  return prescription_string;
}

function signDocument() {
  exec(
    '"C:/Users/Damian/Desktop/inżynierka/cache/podpiskwalifikowany.jar"',
    function (err, stdout, stderr) {
      if (err) {
        console.log(err);
      }
      console.log(stdout);
    }
  );
}

module.exports = {
  getPrescriptionDocument,
  setPrescriptionDocumentValues,
  parseXml,
};
