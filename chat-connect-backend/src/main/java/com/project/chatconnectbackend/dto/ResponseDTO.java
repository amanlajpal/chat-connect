package com.project.chatconnectbackend.dto;

import com.project.chatconnectbackend.enumValues.ResponseStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
    private ResponseStatus status;
    private Object data;
    private String message;
    private int errorCode;
}
