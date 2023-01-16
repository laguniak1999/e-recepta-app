package pl.dlaguna.nzoz.ereceptaapp;

import org.springframework.stereotype.Component;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.*;

@Component
public class PrescriptionService {

    private static final String TRANSFORM_PATH = "erecepta-app/src/main/resources/CDA_PL_IG_1.3.2.xsl";


    public String generatePrescriptionPaperVersion(PrescriptionDocument prescriptionDocument) throws IOException {


        String clinicalDocument = prescriptionDocument.prescriptionDocument;
        TransformerFactory tff = TransformerFactory.newInstance();
        try {
            Transformer tf = tff.newTransformer(new StreamSource(new File(TRANSFORM_PATH)));
            StringReader reader = new StringReader(clinicalDocument);
            StringWriter writer = new StringWriter();
            StreamResult sr = new StreamResult(writer);
            tf.transform(new StreamSource(reader), sr);
            return writer.toString();
        } catch (TransformerException e) {
            throw new RuntimeException(e);
        }
    }



}
