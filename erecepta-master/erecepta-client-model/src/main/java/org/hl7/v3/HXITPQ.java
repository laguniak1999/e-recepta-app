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
 * <p>Java class for HXIT_PQ complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="HXIT_PQ"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{urn:hl7-org:v3}PQ"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="validTime" type="{urn:hl7-org:v3}IVL_TS" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HXIT_PQ", propOrder = {
        "validTime"
})
public class HXITPQ
        extends PQ {

    protected IVLTS validTime;

    /**
     * Gets the value of the validTime property.
     *
     * @return possible object is
     * {@link IVLTS }
     */
    public IVLTS getValidTime() {
        return validTime;
    }

    /**
     * Sets the value of the validTime property.
     *
     * @param value allowed object is
     *              {@link IVLTS }
     */
    public void setValidTime(IVLTS value) {
        this.validTime = value;
    }

}
