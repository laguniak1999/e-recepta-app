//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2019.10.03 at 11:02:58 PM CEST 
//


package org.hl7.v3;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * A restriction of entity name that is effectively a simple string used
 * for a simple name for things and places.
 *
 *
 * <p>Java class for TN complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="TN"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{urn:hl7-org:v3}EN"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="validTime" type="{urn:hl7-org:v3}IVL_TS" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TN")
public class TN
        extends EN {


}
