package com.microservices.playaround.config;

import com.microservices.playaround.service.ProductService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
 @Bean
 public ProductService service() {
  return new ProductService();
 }
}