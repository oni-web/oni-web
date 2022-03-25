package com.jt.demo.controller;

import com.jt.demo.model.Client;
import com.jt.demo.model.MatlabEngineManager;
import com.jt.demo.model.Program;
import com.mathworks.engine.MatlabEngine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;


@RestController
@RequestMapping("/program")
public class ProgramController {
    @Value("${matlab_program_path}")
    String programPath;

    @GetMapping("/start/{programName}")
    public ResponseEntity startProgram(@PathVariable String programName) {
        try {
            MatlabEngine ml = MatlabEngineManager.getEngine(programName);
            //add path
            ml.feval("addpath", programPath);
            int res = ml.feval(programName, 1, 2);
            System.out.println("Start matlab program: " + programName + "res: " + res);

        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/pause/{programName}")
    public void pauseProgram(@PathVariable String programName) {
        // command process id terminal ctrl+Z
        System.out.println("pause matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/terminate/{programName}")
    public void terminateProgram(@PathVariable String programName) {
        // command   ctrl+ C
        System.out.println("terminate matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/checkResult/{programName}")
    public void checkProgram(@PathVariable String programName) {
        // command
        MatlabEngine ml = MatlabEngineManager.getEngine(programName);

        System.out.println("checkResult matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/")
    public ResponseEntity getProgramList() {
        ArrayList<Program> programList = new ArrayList<Program>();
        try {
            Files.list(new File(programPath).toPath())
                    .forEach(path -> {
                        String fileName = String.valueOf(path.getFileName());
                        String name = fileName.substring(0, fileName.lastIndexOf("."));
                        Program program = new Program();
                        program.setName(name);
                        programList.add(program);
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(programList, HttpStatus.OK);
    }
}
