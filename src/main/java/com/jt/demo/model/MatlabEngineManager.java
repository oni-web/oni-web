package com.jt.demo.model;

import com.mathworks.engine.MatlabEngine;

import java.util.HashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class MatlabEngineManager {


    private static HashMap<String, MatlabEngine> map = new HashMap<String, MatlabEngine>();

    public static MatlabEngine getEngine(String programName) {
        boolean flagExist = map.containsKey(programName);
        MatlabEngine returnMl = null;
        if (flagExist) {
            returnMl = map.get(programName);
        } else {
            try {
                Future<MatlabEngine> eng = MatlabEngine.startMatlabAsync();
                returnMl = eng.get();
                map.put(programName,returnMl);
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }
        return returnMl;
    }

//    public MatlabEngine deleteEngine(String programName){
//
//    }


}
