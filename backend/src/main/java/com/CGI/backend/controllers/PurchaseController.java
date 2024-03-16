package com.CGI.backend.controllers;

import com.CGI.backend.DTO.PurchaseRequestDTO;
import com.CGI.backend.models.Purchase;
import com.CGI.backend.services.PurchaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
@AllArgsConstructor
@CrossOrigin
public class PurchaseController {
    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<String> addPurchase(@RequestBody PurchaseRequestDTO purchaseRequestDTO) {
        // Map PurchaseRequestDTO to Purchase entity
        Purchase purchase = new Purchase(purchaseRequestDTO.getSeatNumbers(), purchaseRequestDTO.getMovie());
        purchaseService.addPurchase(purchase);// Add the purchase to the database

        return ResponseEntity.ok("Purchase added successfully");
    }
}
