package com.project.chatconnectbackend.utility;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.project.chatconnectbackend.dto.ResponseDTO;
import com.project.chatconnectbackend.enumValues.ResponseStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class Response {

  public ResponseEntity<ResponseDTO> send(ResponseDTO responseBody) {
    if (responseBody.getStatus() == ResponseStatus.success) {
      return ResponseEntity.ok(responseBody);
    } else if (responseBody.getStatus() == ResponseStatus.error) {
      Integer errorCode = responseBody.getErrorCode() != 0
          ? responseBody.getErrorCode()
          : 400; // Default error code is 400
      return ResponseEntity
          .status(errorCode)
          .body(responseBody);
    } else {
      return ResponseEntity.badRequest().body(responseBody);
    }
  }

  public ResponseEntity<ResponseDTO> success(Object responseBody, String message) {
    return ResponseEntity.ok(ResponseDTO
        .builder()
        .status(ResponseStatus.success)
        .data(responseBody)
        .message(message)
        .errorCode(0)
        .build());
  }

  public ResponseEntity<ResponseDTO> error(Object responseBody, String message, int errorCode) {
    errorCode = errorCode != 0 ? errorCode : 400; // Default error code is 400
    return ResponseEntity
        .status(errorCode)
        .body(ResponseDTO
            .builder()
            .status(ResponseStatus.error)
            .data(responseBody)
            .message(message)
            .errorCode(errorCode)
            .build());
  }

}