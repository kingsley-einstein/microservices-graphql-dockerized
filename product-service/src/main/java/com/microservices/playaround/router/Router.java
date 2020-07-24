package com.microservices.playaround.router;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.microservices.playaround.server.CustomErrorResponse;
import com.microservices.playaround.server.CustomServerResponse;
import com.microservices.playaround.service.ProductService;
import com.microservices.playaround.store.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class Router {
 @Autowired
 private ProductService service;

 @GetMapping
 public ResponseEntity<CustomServerResponse<String>> message() {
  return new ResponseEntity<>(
   new CustomServerResponse<String>(200, "You have reached the product service"),
   HttpStatus.OK
  );
 }

 @PostMapping("/create")
 public ResponseEntity<CustomServerResponse<Product>> create(@RequestBody Map<String, Object> body) {
  try {
   Map<String, Object> map = new HashMap<>();
    body.keySet().forEach((key) -> {
     map.put(key, body.get(key));
    });
   // I will remove comments when I integrate with Openfeign
   // map.put("owner", ownerId);
   Product product = service.create(map);
   return new ResponseEntity<>(
    new CustomServerResponse<Product>(201, product),
    HttpStatus.CREATED
   );
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }

 @GetMapping("/find/{id}")
 public ResponseEntity<CustomServerResponse<Product>> getOneById(@PathVariable("id") Integer id) {
  try {
   Product product = service.findById(id);
   return new ResponseEntity<>(
    new CustomServerResponse<Product>(200, product),
    HttpStatus.OK
   );
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }

 @GetMapping("/findall")
 public ResponseEntity<CustomServerResponse<List<Product>>> getAll() {
  try {
   List<Product> products = service.findAll();
   return new ResponseEntity<>(
    new CustomServerResponse<List<Product>>(200, products),
    HttpStatus.OK
   );
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  } catch (Exception error) {
   throw new CustomErrorResponse(500, error.getMessage());
  }
 }

 @GetMapping("/findwithlimit")
 public ResponseEntity<CustomServerResponse<List<Product>>> getAllWithLimit(@RequestParam("page") Integer page, @RequestParam("limit") Integer limit) {
  try {
   List<Product> products = service.findAllAndLimit(page, limit);
   return new ResponseEntity<>(
    new CustomServerResponse<List<Product>>(200, products),
    HttpStatus.OK
   );
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  } catch (Exception error) {
   throw new CustomErrorResponse(500, error.getMessage());
  }
 }
}