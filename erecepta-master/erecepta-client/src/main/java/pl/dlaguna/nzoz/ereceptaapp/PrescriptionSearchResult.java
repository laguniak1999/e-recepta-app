package pl.dlaguna.nzoz.ereceptaapp;

import lombok.Data;
import pl.gov.csioz.p1.erecepta.mt.v20170510.StatusReceptyEnumMT;

import javax.xml.datatype.XMLGregorianCalendar;
import java.math.BigDecimal;

@Data
public class PrescriptionSearchResult {
    String name;
    String prescriptionKey;
    String paymentLevel;
    String prescriptionNr;
    XMLGregorianCalendar signingData;
    String codeEAN;
    BigDecimal numberOfMedicinePackages;
    StatusReceptyEnumMT prescriptionStatus;

    public PrescriptionSearchResult(String nazwaPrzepisanegoLeku, String kluczRecepty, String poziomOdplatnosciRecepty, String extension, XMLGregorianCalendar dataWystawieniaRecepty, String identyfikatorOpakowaniaLeku, BigDecimal iloscLeku, StatusReceptyEnumMT statusRecepty) {
        name = nazwaPrzepisanegoLeku;
        prescriptionKey = kluczRecepty;
        paymentLevel = poziomOdplatnosciRecepty;
        prescriptionNr = extension;
        signingData = dataWystawieniaRecepty;
        codeEAN = identyfikatorOpakowaniaLeku;
        numberOfMedicinePackages = iloscLeku;
        prescriptionStatus = statusRecepty;
    }
}
