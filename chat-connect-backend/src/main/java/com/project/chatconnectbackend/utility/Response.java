package com.project.chatconnectbackend.utility;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class Response {
  public ResponseEntity<Map<String, Object>> success(Object responseBody, String message) {
    Map<String, Object> responseMap = new HashMap<>();
    responseMap.put("status", "success");
    responseMap.put("data", responseBody);
    responseMap.put("message", message);
    return ResponseEntity.ok(responseMap);
  }

  public ResponseEntity<Map<String, Object>> error(Object responseBody, String message, int errorCode) {
    Map<String, Object> responseMap = new HashMap<>();
    responseMap.put("status", "error");
    responseMap.put("data", responseBody);
    responseMap.put("message", message);
    responseMap.put("errorCode", errorCode != 0 ? errorCode : 400);
    return ResponseEntity.status(errorCode).body(responseMap);
  }

}