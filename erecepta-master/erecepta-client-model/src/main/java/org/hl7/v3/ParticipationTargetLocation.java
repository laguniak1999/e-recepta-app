//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2019.10.03 at 11:02:58 PM CEST 
//


package org.hl7.v3;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ParticipationTargetLocation.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="ParticipationTargetLocation"&gt;
 *   &lt;restriction base="{urn:hl7-org:v3}cs"&gt;
 *     &lt;enumeration value="LOC"/&gt;
 *     &lt;enumeration value="DST"/&gt;
 *     &lt;enumeration value="ELOC"/&gt;
 *     &lt;enumeration value="ORG"/&gt;
 *     &lt;enumeration value="RML"/&gt;
 *     &lt;enumeration value="VIA"/&gt;
 *   &lt;/restriction&gt;
 * &lt;/simpleType&gt;
 * </pre>
 */
@XmlType(name = "ParticipationTargetLocation")
@XmlEnum
public enum ParticipationTargetLocation {

    LOC,
    DST,
    ELOC,
    ORG,
    RML,
    VIA;

    public String value() {
        return name();
    }

    public static ParticipationTargetLocation fromValue(String v) {
        return valueOf(v);
    }

}
