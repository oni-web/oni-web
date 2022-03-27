package com.oni.web.controller;

import com.oni.web.model.MatlabEngineManager;
import com.oni.web.model.Program;
import com.mathworks.engine.MatlabEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/program")
public class ProgramController {
    @Value("${matlab_program_root_path}${matlab_program_rel_dir}")
    String programPath;
    @Value("${matlab_program_root_path}${matlab_program_progress_rel_dir}")
    String progressPath;
    @Value("${matlab_program_root_path}${matlab_program_output_rel_dir}")
    String outputPath;

    Logger logger = LoggerFactory.getLogger(ProgramController.class);
    @GetMapping("/start/{programName}")
    public ResponseEntity<String> startProgram(@PathVariable String programName) {
        MatlabEngineManager.runProgram(programPath, outputPath, programName);
        return ResponseEntity.ok().build();
//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/pause/{programName}")
    public void pauseProgram(@PathVariable String programName) {
        // command process id terminal ctrl+Z
        logger.info("pause matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/terminate/{programName}")
    public void terminateProgram(@PathVariable String programName) {
        // command   ctrl+ C
        logger.info("terminate matlab program: " + programName);

//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    //    Check the output of the program and return it, return null if not finished.
    @GetMapping("/checkResult/{programName}")
    public ResponseEntity<Object> checkProgram(@PathVariable String programName) {

        Path path = Path.of(outputPath + programName);
        logger.info("checkResult matlab program: " + programName);
        if(!Files.exists(path)){
            logger.warn("output file doesn't exist. Check later.");
            return ResponseEntity.ok("Still running, check later");
        }
        String result = null;
        try {
            result = Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(result);
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
