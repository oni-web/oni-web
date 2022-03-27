package com.oni.web.model;

import com.mathworks.engine.EngineException;
import com.mathworks.engine.MatlabEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;


class ProgramRunner implements Runnable {
    private MatlabEngine engine;
    private String programPath;
    private String programName;
    private String outputPath;
    private Logger logger = LoggerFactory.getLogger(Runnable.class);

    public ProgramRunner(MatlabEngine engine, String programPath, String outputPath, String programName) {
        this.engine = engine;
        this.programPath = programPath;
        this.programName = programName;
        this.outputPath = outputPath;

    }

    @Override
    public void run() {
        try {

            var path = Path.of(outputPath + programName);
            double res = engine.feval(programName);
            Path file = Files.createFile(path);
            Files.writeString(file, String.valueOf(res), StandardCharsets.UTF_8);
        } catch (InterruptedException | ExecutionException | IOException e) {
            e.printStackTrace();
        }
    }

}

public class MatlabEngineManager {


    private static HashMap<String, MatlabEngine> engineMap = new HashMap<String, MatlabEngine>();
    private static HashMap<String, Thread> threadMap = new HashMap<String, Thread>();

    private static Logger logger = LoggerFactory.getLogger(MatlabEngineManager.class);


    public static void runProgram(String programPath, String outputPath, String programName) {
        if (threadMap.containsKey(programName) && !threadMap.get(programName).isAlive()) {
            threadMap.remove(programName);
        }
        if (threadMap.containsKey(programName) && threadMap.get(programName).isAlive()) {
            return;
        }
        // process starts
        var path = Path.of(outputPath + programName);
        try {
            // This runs before getting the engine at the very beginning. Otherwise, could check the result of last run.
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        MatlabEngine engine = null;
        if (engineMap.containsKey(programName)) {
            engine = engineMap.get(programName);
        } else {
            try {
                engine = MatlabEngine.startMatlab();
                engineMap.put(programName, engine);
            } catch (EngineException | InterruptedException e) {
                e.printStackTrace();
            }
        }
        if (engine == null) {
            logger.error("Engine instance is null!");
            return;
        }
        try {
            engine.feval("addpath", programPath);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        var runner = new ProgramRunner(engine, programPath, outputPath, programName);
        Thread thread = new Thread(runner);
        thread.start();
        threadMap.put(programName, thread);


    }

//    public MatlabEngine deleteEngine(String programName){
//
//    }


}
