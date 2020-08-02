package com.microservices.playaround.config;

import com.microservices.playaround.server.CustomErrorResponse;

// import org.springframework.stereotype.Component;

import feign.Response;
import feign.codec.ErrorDecoder;

public class CustomFeignErrors implements ErrorDecoder {
 public Default d = new Default();
 public Exception decode(String message, Response r) {
  if (r.status() >= 400) {
   throw new CustomErrorResponse(r.status(), String.format("The service responded with a %d error", r.status()));
  }
  return d.decode(message, r);
 }
}