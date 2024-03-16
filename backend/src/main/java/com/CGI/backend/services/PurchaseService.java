package com.CGI.backend.services;

import com.CGI.backend.models.Purchase;
import com.CGI.backend.repository.PurchaseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;

    public void addPurchase(Purchase purchase) {
        purchaseRepository.save(purchase);
    }
}
