package com.example.jwtDemo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.jwtDemo.dto.OrderDetailsResponse;
import com.example.jwtDemo.dto.OrderSummaryResponse;
import com.example.jwtDemo.service.OrderService;

@RestController
@RequestMapping("/customer/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<OrderSummaryResponse>> getOrders() {

        return ResponseEntity.ok(
                orderService.getOrders()
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailsResponse> getOrder(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(
                orderService.getOrder(orderId)
        );
    }
}