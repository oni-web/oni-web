package com.oni.web.model;

import com.mathworks.engine.EngineException;
import com.mathworks.engine.MatlabEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;


class ProgramRunner implements Runnable {
    private final MatlabEngine engine;
    private final String programPath;
    private final String programName;
    private final String outputPath;
    private final HashMap<String, String> statusMap;
    private final Logger logger = LoggerFactory.getLogger(Runnable.class);

    public ProgramRunner(MatlabEngine engine, String programPath, String outputPath, String programName, HashMap<String, String> statusMap) {


        this.engine = engine;
        this.programPath = programPath;
        this.programName = programName;
        this.outputPath = outputPath;
        this.statusMap = statusMap;

    }

    @Override
    public void run() {
        try {
//            MatlabEngine engine = MatlabEngine.startMatlab();
            // act like environment variable (path)
//            engine.feval("addpath", programPath);
            var path = Path.of(outputPath + programName);
            Files.createFile(path);
            // Output file will be written by matlab program.
            engine.feval(programName);
            statusMap.put(programName, MatlabEngineManager.STATUS_FINISHED);
        } catch (InterruptedException | ExecutionException | IOException e) {
            e.printStackTrace();
        }
    }

}

public class MatlabEngineManager {

    public static final String STATUS_RUNNING = "running";
    public static final String STATUS_PAUSED = "paused";
    public static final String STATUS_STOPPED = "stopped";
    public static final String STATUS_FINISHED = "finished";
    private static HashMap<String, MatlabEngine> engineMap = new HashMap<String, MatlabEngine>();
    private static HashMap<String, Thread> threadMap = new HashMap<String, Thread>();
    private static HashMap<String, String> statusMap = new HashMap<>();

    private static final Logger logger = LoggerFactory.getLogger(MatlabEngineManager.class);

    public static HashMap getThreadMap() {
        return threadMap;
    }

    public static HashMap<String, String> getStatusMap() {
        return statusMap;
    }

    public static MatlabEngine getEngine(String programName) {
        MatlabEngine engine = null;
        if (engineMap.containsKey(programName)) {
            engine = engineMap.get(programName);
        } else {
            try {
                logger.info("Initiating a new engine...");
                engine = MatlabEngine.startMatlab();
                engineMap.put(programName, engine);
            } catch (EngineException | InterruptedException e) {
                e.printStackTrace();
            }
        }
        return engine;
    }

    public static String getStatus(String programName) {
        return statusMap.getOrDefault(programName, STATUS_STOPPED);
    }

    public static void runProgram(String programPath, String outputPath, String controlFlagPath, String programName) {
        if (threadMap.containsKey(programName) && !threadMap.get(programName).isAlive()) {
            threadMap.remove(programName);
        }
        if (threadMap.containsKey(programName) && threadMap.get(programName).isAlive()) {
            return;
        }
        var flagPath = Path.of(controlFlagPath + programName);
        try {
            if (!Files.exists(flagPath)) Files.createFile(flagPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            FileWriter myWriter = new FileWriter(controlFlagPath + programName);
            myWriter.write(0);
            myWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // process starts
        var path = Path.of(outputPath + programName);
        try {
            // This runs before getting the engine at the very beginning. Otherwise, could check the result of last run.
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        MatlabEngine engine = getEngine(programName);
        logger.info("Gotten the engine.");
        if (engine == null) {
            logger.error("Engine instance is null!");
            return;
        }
        try {
            // act like environment variable (path)
            engine.feval("addpath", programPath);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        logger.info("Making new runner to run program " + programName);
        var runner = new ProgramRunner(engine, programPath, outputPath, programName, statusMap);
        Thread thread = new Thread(runner);
        thread.start();
        threadMap.put(programName, thread);
        statusMap.put(programName, STATUS_RUNNING);

    }

    public static void pauseProgram(String outputPath, String progressPath, String controlFlagPath, String programName) {
        if (threadMap.containsKey(programName)) {
            threadMap.get(programName);
        }
    }


    public static void terminateProgram(String outputPath, String progressPath, String controlFlagPath, String programName) {
        var flagPath = Path.of(controlFlagPath + programName);
        try {
            if (!Files.exists(flagPath)) Files.createFile(flagPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            FileWriter myWriter = new FileWriter(controlFlagPath + programName);
            myWriter.write(1);
            myWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //        threadMap.get(programName).stop();

        threadMap.remove(programName);
        statusMap.put(programName, STATUS_STOPPED);

        // Delete output file.
        var path = Path.of(outputPath + programName);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static String getCodes(String programPath, String programName) {
        var path = Path.of(programPath + programName + ".m");
        String codes = "";
        try {
            codes = Files.readString(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return codes;
    }

}
