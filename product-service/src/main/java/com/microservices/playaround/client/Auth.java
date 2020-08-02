package com.microservices.playaround.client;

import java.util.Date;

@SuppressWarnings("serial")
public class Auth implements java.io.Serializable {
 private Integer id;
 private String name;
 private String token;
 private Integer age;
 private Date dob;

 public Auth() {}

 public Integer getId() {
  return id;
 }

 public String getName() {
  return name;
 }

 public String getToken() {
  return token;
 }

 public Integer getAge() {
  return age;
 }

 public Date getDob() {
  return dob;
 }
}
