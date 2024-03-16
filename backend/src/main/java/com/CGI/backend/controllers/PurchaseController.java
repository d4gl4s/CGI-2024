package com.CGI.backend.controllers;

import com.CGI.backend.services.PurchaseService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/purchases")
@AllArgsConstructor
@CrossOrigin
public class PurchaseController {
    private final PurchaseService purchaseService;
}
