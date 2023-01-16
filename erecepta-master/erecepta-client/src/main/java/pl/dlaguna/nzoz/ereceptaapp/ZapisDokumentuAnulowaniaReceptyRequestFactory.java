package pl.dlaguna.nzoz.ereceptaapp;

import org.apache.cxf.helpers.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import pl.gov.csioz.p1.erecepta.mt.v20170510.DokumentAnulowaniaReceptyMT;
import pl.gov.csioz.p1.erecepta.ws.v20170510.ZapisDokumentuAnulowaniaReceptyRequest;
import pl.gov.csioz.p1.erecepta.mt.v20170510.KluczReceptyMT;

import java.io.InputStream;

@Component
public class ZapisDokumentuAnulowaniaReceptyRequestFactory {
    @Value("classpath:anulowanie-wypelnione.xml")
    private Resource anulowaniexml;

    public ZapisDokumentuAnulowaniaReceptyRequest create(String key) throws Exception {
        KluczReceptyMT kluczReceptyMT = new KluczReceptyMT();
        kluczReceptyMT.setKluczRecepty(key);


        ZapisDokumentuAnulowaniaReceptyRequest zapisDokumentuAnulowaniaReceptyRequest = new ZapisDokumentuAnulowaniaReceptyRequest();

        zapisDokumentuAnulowaniaReceptyRequest.setKluczRecepty(kluczReceptyMT);

        InputStream inputStream = anulowaniexml.getInputStream();

        DokumentAnulowaniaReceptyMT dokumentAnulowaniaReceptyMT = new DokumentAnulowaniaReceptyMT();

        dokumentAnulowaniaReceptyMT.setTresc(IOUtils.readBytesFromStream(inputStream));

        zapisDokumentuAnulowaniaReceptyRequest.setDokumentAnulowaniaRecepty(dokumentAnulowaniaReceptyMT);


        return zapisDokumentuAnulowaniaReceptyRequest;
    }
}
