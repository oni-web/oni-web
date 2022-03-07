package com.jt.demo.controller;

import com.jt.demo.model.Client;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/program")
public class ProgramController {

    @GetMapping("/start/{programName}")
    public void startProgram(@PathVariable String programName) {
        // command
        System.out.println("Start matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/pause/{programName}")
    public void pauseProgram(@PathVariable String programName) {
        // command
        System.out.println("pause matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/terminate/{programName}")
    public void terminateProgram(@PathVariable String programName) {
        // command
        System.out.println("terminate matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/checkResult/{programName}")
    public void checkProgram(@PathVariable String programName) {
        // command
        System.out.println("checkResult matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }
}
