package com.oni.web.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


public class ProgramResult {

    private String textResult;

    private ArrayList<String> imgResult;

    public String getTextResult() {
        return textResult;
    }

    public void setTextResult(String textResult) {
        this.textResult = textResult;
    }

    public ArrayList<String> getImgResult() {
        return imgResult;
    }

    public void setImgResult(ArrayList<String> imgResult) {
        this.imgResult = imgResult;
    }
}
