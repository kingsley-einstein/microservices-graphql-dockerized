package com.microservices.playaround.router;

import com.microservices.playaround.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class Router {
 @Autowired
 private ProductService service;

 @PostMapping("/create")
 public void create() {}
}