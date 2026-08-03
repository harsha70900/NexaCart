package com.example.jwtDemo.dto;

import java.math.BigDecimal;

public record OrderSummaryResponse(
        Long orderId,
        BigDecimal totalAmount,
        String status
) {
}
