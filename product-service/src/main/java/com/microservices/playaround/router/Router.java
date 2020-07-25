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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

 @PatchMapping("update/{id}")
 public ResponseEntity<CustomServerResponse<List<Object>>> updateOne(@PathVariable("id") Integer id, @RequestBody Map<String, Object> body) {
  try {
   Product p = new Product();
   if (body.get("name") != null) p.setName((String) body.get("name"));
   if (body.get("description") != null) p.setDescription((String) body.get("description"));
   List<Object> updated = service.updateById(id, p);
   return new ResponseEntity<>(
    new CustomServerResponse<List<Object>>(
     200, updated
    ),
    HttpStatus.OK
   );
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }

 @DeleteMapping("delete/{id}")
 public ResponseEntity<CustomServerResponse<String>> deleteOne(@PathVariable("id") Integer id) {
  try {
   String s = service.deleteById(id);
   return new ResponseEntity<>(
    new CustomServerResponse<String>(200, s),
    HttpStatus.OK
   );
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }
}