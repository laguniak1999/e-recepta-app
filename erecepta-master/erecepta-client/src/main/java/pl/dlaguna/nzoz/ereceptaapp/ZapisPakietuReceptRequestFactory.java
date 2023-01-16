package pl.dlaguna.nzoz.ereceptaapp;

import pl.gov.csioz.p1.erecepta.mt.v20170510.PakietReceptMT;
import pl.gov.csioz.p1.erecepta.mt.v20170510.ReceptaMT;
import pl.gov.csioz.p1.erecepta.mt.v20170510.ReceptyMT;
import pl.gov.csioz.p1.erecepta.ws.v20170510.ZapisPakietuReceptRequest;
import pl.gov.csioz.p1.wspolne.mt.v20170510.IdentyfikatorZadaniaMT;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class ZapisPakietuReceptRequestFactory {

    public ZapisPakietuReceptRequest create(PrescriptionDocument prescriptionDocument) throws Exception {
        ZapisPakietuReceptRequest zapisPakietuReceptRequest = new ZapisPakietuReceptRequest();

        PakietReceptMT pakietRecept = new PakietReceptMT();

        ReceptyMT recepty = new ReceptyMT();

        ReceptaMT recepta = new ReceptaMT();
        recepta.setIdentyfikatorDokumentuWPakiecie(1);
        recepta.setTresc(prescriptionDocument.prescriptionDocument.getBytes());

        recepty.getRecepta().add(recepta);

        IdentyfikatorZadaniaMT identyfikatorZadania = new IdentyfikatorZadaniaMT();
        identyfikatorZadania.setIdZadania(UUID.randomUUID().toString());

        pakietRecept.setRecepty(recepty);
        zapisPakietuReceptRequest.setPakietRecept(pakietRecept);

        return zapisPakietuReceptRequest;
    }
}
