package com.microservices.playaround.client;

import com.microservices.playaround.server.CustomServerResponse;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-service", path = "/api/v1/auth")
public interface AuthClient {
 @GetMapping("/logged")
 public ResponseEntity<CustomServerResponse<Auth>> getLoggedUser(@RequestHeader("Authorization") String authorization);
}