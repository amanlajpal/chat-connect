package com.project.chatconnectbackend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.chatconnectbackend.controller.v1.ControllerV1;

@RestController
@RequestMapping(path="/api")
public class MainController {
    
    private final ControllerV1 controllerV1;

    @Autowired
    public MainController(ControllerV1 controllerV1) {
        this.controllerV1 = controllerV1;
    }

    // Routes for Version 1 of the API
    @RequestMapping("/v1")
    public ControllerV1 version1() {
        return controllerV1;
    }
}