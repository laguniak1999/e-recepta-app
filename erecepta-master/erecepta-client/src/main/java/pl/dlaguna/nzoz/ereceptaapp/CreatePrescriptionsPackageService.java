package pl.dlaguna.nzoz.ereceptaapp;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.gov.csioz.p1.erecepta.mt.v20170510.WynikRozszerzonegoWyszukiwaniaReceptUslugobiorcyMT;
import pl.gov.csioz.p1.erecepta.mt.v20170510.WynikiRozszerzonegoWyszukiwaniaReceptUslugobiorcyMT;
import pl.gov.csioz.p1.erecepta.ws.v20170510.*;
import pl.gov.csioz.p1.kontekst.mt.v20170510.KontekstMT;
import org.springframework.stereotype.Service;
import pl.gov.csioz.p1.wspolne.mt.v20170510.WynikMT;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@RequestMapping("/api")
@Service
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CreatePrescriptionsPackageService {
    @Autowired
    private ObslugaReceptyWS obslugaReceptyWSclient;

    @Autowired
    private KontekstMTFactory kontekstMTFactory;

    @Autowired
    private ZapisPakietuReceptRequestFactory zapisPakietuReceptRequestFactory;

    @Autowired
    private ZapisDokumentuAnulowaniaReceptyRequestFactory zapisDokumentuAnulowaniaReceptyRequestFactory;


    @Autowired
    private RozszerzoneWyszukiwanieReceptUslugobiorcyRequestFactory rozszerzoneWyszukiwanieReceptUslugobiorcyRequestFactory;

    @Autowired
    private PrescriptionService prescriptionService;



    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public String sendPrescription(@RequestBody PrescriptionDocument body) {
        KontekstMT kontekstMT = kontekstMTFactory.create();
        try {
            ZapisPakietuReceptRequest zapisPakietuRecept = zapisPakietuReceptRequestFactory.create(body);

            ZapisPakietuReceptResponse response = obslugaReceptyWSclient.zapisPakietuRecept(zapisPakietuRecept, kontekstMT);
            return response.getWynik().getKomunikat();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Nie udało się wysłać recepty";
    }

    @RequestMapping(value = "/cancel", method = RequestMethod.POST)
    public WynikMT cancelPrescription(@RequestBody CancelPrescription body) throws Exception {

        KontekstMT kontekstMT = kontekstMTFactory.create();
        ZapisDokumentuAnulowaniaReceptyRequest zapisDokumentuAnulowaniaReceptyRequest = zapisDokumentuAnulowaniaReceptyRequestFactory.create(body.prescription_key);

        ZapisDokumentuAnulowaniaReceptyResponse response = obslugaReceptyWSclient.zapisDokumentuAnulowaniaRecepty(zapisDokumentuAnulowaniaReceptyRequest, kontekstMT);
        return response.getWynik();

    }

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public List<PrescriptionSearchResult> searchPrescription(@RequestBody PrescriptionSearchRequest body) throws Exception {
        RozszerzoneWyszukiwanieReceptUslugobiorcyRequest rozszerzoneWyszukiwanieReceptUslugobiorcyRequest = rozszerzoneWyszukiwanieReceptUslugobiorcyRequestFactory.create(body);

        KontekstMT kontekstMT = kontekstMTFactory.create();
        RozszerzoneWyszukiwanieReceptUslugobiorcyResponse response = obslugaReceptyWSclient.rozszerzoneWyszukiwanieReceptUslugobiorcy(rozszerzoneWyszukiwanieReceptUslugobiorcyRequest, kontekstMT);

        return createSearchResponse(response.getWynikiRozszerzonegoWyszukiwaniaReceptUslugobiorcy());

    }

    private List<PrescriptionSearchResult> createSearchResponse(WynikiRozszerzonegoWyszukiwaniaReceptUslugobiorcyMT results) {
        return getSearchPrescriptionResults(results.getWynikRozszerzonegoWyszukiwaniaReceptUslugobiorcy());
    }


    private List<PrescriptionSearchResult> getSearchPrescriptionResults(List<WynikRozszerzonegoWyszukiwaniaReceptUslugobiorcyMT> results) {
        return results.stream().map(this::mapSearchResult).collect(Collectors.toList());
    }

    private PrescriptionSearchResult mapSearchResult(WynikRozszerzonegoWyszukiwaniaReceptUslugobiorcyMT result) {
        return new PrescriptionSearchResult(
                result.getNazwaPrzepisanegoLeku(),
                result.getKluczRecepty(),
                result.getPoziomOdplatnosciRecepty(),
                result.getNumerRecepty().getExtension(),
                result.getDataWystawieniaRecepty(),
                result.getIdentyfikatorOpakowaniaLeku(),
                result.getIloscLeku(),
                result.getStatusRecepty()
                );
    }

    @RequestMapping(value = "/paper", method = RequestMethod.POST)
    public String getPaperVersion(@RequestBody PrescriptionDocument body) throws IOException {

        return prescriptionService.generatePrescriptionPaperVersion(body);
    }

}
