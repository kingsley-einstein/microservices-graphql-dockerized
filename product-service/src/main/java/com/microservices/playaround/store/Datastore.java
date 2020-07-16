package com.microservices.playaround.store;

import com.microservices.playaround.store.model.Product;

import java.util.ArrayList;
import java.util.List;

public class Datastore {
 List<Product> products;

 public Datastore() {
  this.products = new ArrayList<>();
 }

 public Product create(Product product) {
  boolean added = products.add(product);
  return added ? products.get(products.indexOf(product)) : null;
 }

 public Product findById(Integer id) {
  Product product = null;
  for (Product p: products) {
   if (p.getId() == id) {
    product = p;
   }
  }
  return product;
 }

 public List<Product> findAll() {
  return products;
 }

 public List<Object> updateById(Integer id, Product p) {
 }
}
