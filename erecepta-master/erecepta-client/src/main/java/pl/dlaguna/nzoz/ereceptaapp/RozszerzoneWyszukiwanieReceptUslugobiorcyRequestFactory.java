package pl.dlaguna.nzoz.ereceptaapp;

import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import pl.gov.csioz.p1.wspolne.mt.v20170510.IdentyfikatorUslugobiorcyOIDMT;
import pl.gov.csioz.p1.erecepta.mt.v20170510.RozszerzoneKryteriaWyszukiwaniaReceptUslugobiorcyMT;
import pl.gov.csioz.p1.erecepta.ws.v20170510.RozszerzoneWyszukiwanieReceptUslugobiorcyRequest;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;

import static org.eclipse.jetty.util.StringUtil.isEmpty;

@Component
public class RozszerzoneWyszukiwanieReceptUslugobiorcyRequestFactory {

    private final static String PATIENT_OID_TEMPLATE_ROOT = "2.16.840.1.113883.3.4424.1.1.616";
    private final static String DATE_PATTERN = "yyyy-MM-dd";

    @SneakyThrows
    public RozszerzoneWyszukiwanieReceptUslugobiorcyRequest create(PrescriptionSearchRequest searchRequest) {
        RozszerzoneWyszukiwanieReceptUslugobiorcyRequest request = new RozszerzoneWyszukiwanieReceptUslugobiorcyRequest();
        RozszerzoneKryteriaWyszukiwaniaReceptUslugobiorcyMT kryteriaWyszukiwania = new RozszerzoneKryteriaWyszukiwaniaReceptUslugobiorcyMT();
        kryteriaWyszukiwania.setIdUslugobiorcy(createIdentyfikatorUslugobiorcyOIDMT(searchRequest.getPesel()));

        if (!isEmpty(searchRequest.getStartDate())){
            kryteriaWyszukiwania.setDataWystawieniaReceptyOd(formatToXMLGregorianCalendar(searchRequest.getStartDate()));
        }
        if (!isEmpty(searchRequest.getEndDate())){
            kryteriaWyszukiwania.setDataWystawieniaReceptyDo(formatToXMLGregorianCalendar(searchRequest.getEndDate()));
        }
        if (!isEmpty(searchRequest.getProductName())){
            kryteriaWyszukiwania.setNazwaLeku(searchRequest.getProductName());
        }
        request.setRozszerzoneKryteriaWyszukiwaniaReceptUslugobiorcy(kryteriaWyszukiwania);
        return request;
    }

    private IdentyfikatorUslugobiorcyOIDMT createIdentyfikatorUslugobiorcyOIDMT(String pesel) {
        IdentyfikatorUslugobiorcyOIDMT identyfikatorUslugobiorcyOIDMT = new IdentyfikatorUslugobiorcyOIDMT();
        identyfikatorUslugobiorcyOIDMT.setExtension(pesel);
        identyfikatorUslugobiorcyOIDMT.setRoot(PATIENT_OID_TEMPLATE_ROOT);
        return identyfikatorUslugobiorcyOIDMT;
    }

    @SneakyThrows
    private XMLGregorianCalendar formatToXMLGregorianCalendar(String requestDate) {
        DateFormat format = new SimpleDateFormat(DATE_PATTERN);
        Date date = format.parse(requestDate);
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(date);
        return DatatypeFactory.newInstance().newXMLGregorianCalendar(cal);
    }

}
