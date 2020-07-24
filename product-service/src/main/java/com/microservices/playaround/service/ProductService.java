package com.microservices.playaround.service;

import com.microservices.playaround.server.CustomErrorResponse;
import com.microservices.playaround.store.Datastore;
import com.microservices.playaround.store.model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProductService {
 final Datastore store = new Datastore();
 final List<Integer> ids = new ArrayList<>();

 public ProductService() {
  this.ids.add(0);
 }

 public Product create(Map<String, Object> map) {
  try {
   Product product = new Product(
   ids.get(ids.size() - 1) + 1,
   (String) map.get("name"),
   (Integer) map.get("owner"),
   (String) map.get("description")
  );
   return store.create(product);
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }

 public Product findById(Integer id) {
  try {
   return store.findById(id);
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }

 public List<Product> findAll() {
  return store.findAll();
 }

 public List<Product> findAllAndLimit(Integer page, Integer limit) {
  return store.findAllAndLimit(limit, page);
 }

 public List<Object> updateById(Integer id, Product product) {
  try {
   return store.updateById(id, product);
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }

 public String deleteById(Integer id) {
  try {
   return store.deleteById(id);
  } catch (CustomErrorResponse error) {
   throw new CustomErrorResponse(error.getCode(), error.getMessage());
  }
 }
}