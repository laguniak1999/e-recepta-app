//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2019.10.03 at 11:02:58 PM CEST 
//


package ihe.pharm;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ActClassExtract.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="ActClassExtract"&gt;
 *   &lt;restriction base="{urn:ihe:pharm}cs"&gt;
 *     &lt;enumeration value="EXTRACT"/&gt;
 *     &lt;enumeration value="EHR"/&gt;
 *   &lt;/restriction&gt;
 * &lt;/simpleType&gt;
 * </pre>
 */
@XmlType(name = "ActClassExtract")
@XmlEnum
public enum ActClassExtract {

    EXTRACT,
    EHR;

    public String value() {
        return name();
    }

    public static ActClassExtract fromValue(String v) {
        return valueOf(v);
    }

}
