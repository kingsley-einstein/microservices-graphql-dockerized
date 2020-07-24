package com.microservices.playaround.server;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {
 @ExceptionHandler(CustomErrorResponse.class)
 public ResponseEntity<CustomServerResponse<String>> exception(CustomErrorResponse error) {
  return new ResponseEntity<>(
   new CustomServerResponse<String>(error.getCode(), error.getMessage()),
   HttpStatus.valueOf(error.getCode())
  );
 } 
}