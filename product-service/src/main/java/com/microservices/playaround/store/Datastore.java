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

 public List<Product> findAllAndLimit(Integer limit, Integer page) {
  return products.subList((page - 1) * limit, limit * page);
 }

 public List<Object> updateById(Integer id, Product p) {
  Product product = null;
  for (Product p2: products) {
   if (p2.getId() == id) product = p2; 
  }
  if (p.getName() != null) {
   product.setName(p.getName());
  }
  if (p.getDescription() != null) {
   product.setDescription(p.getDescription());
  }
  for (Integer i = 0; i < products.size(); i++) {
   if (products.get(i).getId() == product.getId()) {
    products.add(i, product);
   }
  }
  List<Object> returned = new ArrayList<>();
  returned.add(0, 1);
  returned.add(1, product);

  return returned;
 }

 public void deleteById(Integer id) {
  for (Product p: products) {
   if (p.getId() == id) products.remove(p);
  }
 }
}
