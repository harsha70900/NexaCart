package com.example.jwtDemo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwtDemo.entity.PurchaseOrder;
import com.example.jwtDemo.entity.User;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    Optional<PurchaseOrder> findByIdAndUser(Long id, User user);

    List<PurchaseOrder> findByUserOrderByIdDesc(User user);

}