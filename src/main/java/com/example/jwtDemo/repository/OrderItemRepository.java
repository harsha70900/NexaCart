package com.example.jwtDemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwtDemo.entity.OrderItem;
import com.example.jwtDemo.entity.PurchaseOrder;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(PurchaseOrder order);

}