package com.microservices.playaround.service;

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
  Product product = new Product(
   ids.get(ids.size() - 1) + 1,
   (String) map.get("name"),
   (Integer) map.get("owner"),
   (String) map.get("description")
  );
  return store.create(product);
 }

 public Product findById(Integer id) {
  return store.findById(id);
 }

 public List<Product> findAll() {
  return store.findAll();
 }

 public List<Object> updateById(Integer id, Product product) {
  return store.updateById(id, product);
 }

 public void deleteById(Integer id) {
  store.deleteById(id);
 }
}