package com.example.jwtDemo.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.jwtDemo.dto.OrderDetailsResponse;
import com.example.jwtDemo.dto.OrderItemResponse;
import com.example.jwtDemo.dto.OrderSummaryResponse;
import com.example.jwtDemo.entity.OrderItem;
import com.example.jwtDemo.entity.PurchaseOrder;
import com.example.jwtDemo.entity.User;
import com.example.jwtDemo.repository.OrderItemRepository;
import com.example.jwtDemo.repository.PurchaseOrderRepository;
import com.example.jwtDemo.repository.UserRepository;

@Service
public class OrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    public OrderService(
            PurchaseOrderRepository purchaseOrderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository) {

        this.purchaseOrderRepository = purchaseOrderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
    }

    public List<OrderSummaryResponse> getOrders() {

        User user = getCurrentUser();

        return purchaseOrderRepository
                .findByUserOrderByIdDesc(user)
                .stream()
                .map(order -> new OrderSummaryResponse(
                        order.getId(),
                        order.getTotalAmount(),
                        order.getStatus()
                ))
                .toList();
    }

    public OrderDetailsResponse getOrder(Long orderId) {

        User user = getCurrentUser();

        PurchaseOrder order = purchaseOrderRepository
                .findByIdAndUser(orderId, user)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        List<OrderItemResponse> items = orderItemRepository
                .findByOrder(order)
                .stream()
                .map(this::mapToOrderItem)
                .toList();

        return new OrderDetailsResponse(
                order.getId(),
                order.getTotalAmount(),
                order.getStatus(),
                items
        );
    }

    private OrderItemResponse mapToOrderItem(OrderItem item) {

        return new OrderItemResponse(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getQuantity(),
                item.getPriceAtPurchase(),
                item.getPriceAtPurchase()
                        .multiply(java.math.BigDecimal.valueOf(item.getQuantity())),
                item.getProduct().getImageUrl()
        );
    }

    private User getCurrentUser() {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}