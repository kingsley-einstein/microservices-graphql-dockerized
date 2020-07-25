package com.microservices.playaround.store.model;

@SuppressWarnings("serial")
public class Product implements java.io.Serializable {
 Integer id;
 String name;
 Integer owner;
 String description;

 public Product() {}

 public Product(Integer id, String name, Integer owner, String description) {
  this.id = id;
  this.name = name;
  this.owner = owner;
  this.description = description;
 }

 public void setDescription(String description) {
  this.description = description;
 }

 public String getDescription() {
  return description;
 }

 public void setName(String name) {
  this.name = name;
 }

 public Integer getId() {
  return id;
 }

 public String getName() {
  return name;
 }

 public Integer getOwner() {
  return owner;
 }
}