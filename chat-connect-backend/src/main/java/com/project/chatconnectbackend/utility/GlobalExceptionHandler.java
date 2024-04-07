package com.project.chatconnectbackend.utility;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.validation.ConstraintViolationException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private Map<String, Object> createErrorResponse(String errorMessage) {
        Map<String, Object> errorResponseBody = new HashMap<>();
        errorResponseBody.put("status", "error");
        errorResponseBody.put("message", errorMessage);
        return errorResponseBody;
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        Throwable cause = ex.getCause();
        if (cause instanceof ConstraintViolationException) {
            ConstraintViolationException constraintViolationException = (ConstraintViolationException) cause;
            // String constraintName = constraintViolationException.getConstraintName();
            String message = constraintViolationException.getMessage();
            
            // Extract more details as needed from constraintViolationException
            
            Map<String, Object> errorResponseBody = new HashMap<>();
            errorResponseBody.put("status", "error");
            errorResponseBody.put("message", "Data integrity violation: " + message);
            errorResponseBody.put("constraintName", "constraintName");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponseBody);
        } else {
            // Handle other types of DataIntegrityViolationException
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(createErrorResponse("An error occurred: " + ex.getMessage()));
        }
    }

    // @ExceptionHandler(DataIntegrityViolationException.class)
    // @ResponseBody
    // public ResponseEntity<Map<String, Object>> handleDataIntegrityViolationException(
    //         DataIntegrityViolationException ex) {
    //     Map<String, Object> errorResponseBody = new HashMap<>();
    //     errorResponseBody.put("status", "error");
    //     errorResponseBody.put("message", "User with the provided phone number or email already exists");
    //     return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponseBody);
    // }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> handleEmptyResultDataAccessException(EmptyResultDataAccessException ex) {
        Map<String, Object> errorResponseBody = new HashMap<>();
        errorResponseBody.put("status", "error");
        errorResponseBody.put("message", "User not found" + ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponseBody);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> handleException(Exception ex) {
        Map<String, Object> errorResponseBody = new HashMap<>();
        errorResponseBody.put("status", "error");
        errorResponseBody.put("message", "An error occurred: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponseBody);
    }
}
