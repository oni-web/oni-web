package com.oni.web.controller;

import com.oni.web.model.MatlabEngineManager;
import com.oni.web.model.Program;
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


@RestController
@RequestMapping("/program")
public class ProgramController {
    @Value("${matlab_program_root_path}${matlab_program_rel_dir}")
    String programPath;
    @Value("${matlab_program_root_path}${matlab_program_progress_rel_dir}")
    String progressPath;
    @Value("${matlab_program_root_path}${matlab_program_output_rel_dir}")
    String outputPath;
    @Value("${matlab_program_root_path}${matlab_program_controlPath_rel_dir}")
    String controlFlagPath;

    Logger logger = LoggerFactory.getLogger(ProgramController.class);

    @GetMapping("/start/{programName}")
    public ResponseEntity<String> startProgram(@PathVariable String programName) {
        MatlabEngineManager.runProgram(programPath, outputPath, controlFlagPath, programName);
        return ResponseEntity.ok("Started successfully.");
//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/pause/{programName}")
    public void pauseProgram(@PathVariable String programName) {
        //TODO pause program
        // command process id terminal ctrl+Z
        logger.info("pause matlab program: " + programName);
        MatlabEngineManager.pauseProgram(programPath, outputPath, controlFlagPath, programName);
//        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/terminate/{programName}")
    public ResponseEntity<Object> terminateProgram(@PathVariable String programName) {
        logger.info("terminate matlab program: " + programName);
        MatlabEngineManager.terminateProgram(outputPath, progressPath, controlFlagPath, programName);
        return ResponseEntity.ok().build();
    }


    /**
     * Check the output of the program and return it.
     * The result file <outputPath> is written by the matlab program.
     * So this function returns whatever the output file has.
     */
    @GetMapping("/checkResult/{programName}")
    public ResponseEntity<Object> checkProgram(@PathVariable String programName) {

        Path path = Path.of(outputPath + programName);
        logger.info("checkResult matlab program: " + programName);
        if (!Files.exists(path)) {
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

    @GetMapping("/getProgress/{programName}")
    public ResponseEntity<Object> getProgress(@PathVariable String programName) {
        class Progress {
            final String status;
            final Double fraction;

            public Progress(String status, Double fraction) {
                this.status = status;
                this.fraction = fraction;
            }

            public String getStatus() {
                return status;
            }

            public Double getFraction() {
                return fraction;
            }
        }
        Path path = Path.of(progressPath + programName);
        logger.info("get progress of matlab program: " + programName);
//        if (!Files.exists(path)) {
//            logger.error("progress file doesn't exist!");
//            return ResponseEntity.ok(new Progress("stopped", 0.0));
//        }
        String status = MatlabEngineManager.getStatus(programName);
        double fraction = 0.0;
        try {
            fraction = Double.parseDouble(Files.readString(path, StandardCharsets.UTF_8));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new Progress(status, fraction));
    }

    @GetMapping("/getDetails/{programName}")
    public ResponseEntity<Object> getDetails(@PathVariable String programName) {
        Program program = new Program();
        String codes = MatlabEngineManager.getCodes(programPath, programName);

        program.setName(programName);
        program.setCodes(codes);
        return ResponseEntity.ok(program);
    }

    /**
     * This function returns all the filenames under programPath.
     * It doesn't check whether there are invalid files under the directory. Be aware of that!
     */
    @GetMapping("/")
    public ResponseEntity<Object> getProgramList() {
        ArrayList<Program> programList = new ArrayList<Program>();
        try {
            Files.list(new File(programPath).toPath())
                    .forEach(path -> {
                        String fileName = String.valueOf(path.getFileName());
                        String name = null;
                        String extension = null;
                        try {
                            name = fileName.substring(0, fileName.lastIndexOf("."));
                            extension = fileName.substring(fileName.lastIndexOf("."));
                        } catch (StringIndexOutOfBoundsException e) {
                            logger.warn("File name " + fileName + " is not a matlab program.");
                        }
                        if (name != null && extension != null && extension.equals(".m")) {
                            Program program = new Program();
                            program.setName(name);
                            // TODO Read description from matlab file...
                            program.setDescription("Read description from matlab file... ");
//                        var threadMap = MatlabEngineManager.getThreadMap();
                            program.setStatus(MatlabEngineManager.getStatus(name));
                            programList.add(program);
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(programList, HttpStatus.OK);
    }
}
