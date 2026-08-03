package com.example.jwtDemo.dto;

import java.math.BigDecimal;
import java.util.List;

public record OrderDetailsResponse(
        Long orderId,
        BigDecimal totalAmount,
        String status,
        List<OrderItemResponse> items
) {
}