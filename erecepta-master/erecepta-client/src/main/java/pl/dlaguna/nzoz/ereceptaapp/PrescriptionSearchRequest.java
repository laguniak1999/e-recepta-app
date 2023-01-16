package pl.dlaguna.nzoz.ereceptaapp;

import lombok.Data;

@Data
public class PrescriptionSearchRequest {
    String pesel;
    String startDate;
    String endDate;
    String productName;
}

