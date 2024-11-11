package com.semony.integrated.application;

import com.semony.integrated.domain.entity.FlowRecipe;
import java.time.LocalDateTime;

public class PathFinder {

//    private static final String basePath = "../../var/libs/data/nfs_shared";

    private final String PPID;
    private final String in;
    private final String ewim;
    private final String out;
    private final String lotSeq;
    private final String lotId;
    private final String slotNo;
    private final String slotNoExcludeZero;
    private final String date;

    public String getBasePath(String moduleName){

        if(moduleName.equals("MIW7-51") ||
            moduleName.equals("MIW7-61") ||
            moduleName.equals("EWIM1-36") ||
            moduleName.equals("EWIM1-46")){
            return "/var/libs/data/module-server1";
        }

        return "/var/libs/data/module-server2";
    }

    public PathFinder(FlowRecipe flowRecipe, String lotSeq, String lotId, String slotNo, LocalDateTime date) {
        this.PPID = flowRecipe.getPpid();
        this.in = flowRecipe.getIn();
        this.ewim = flowRecipe.getEwim();
        this.out = flowRecipe.getOut();
        this.lotSeq = lotSeq;
        this.lotId = lotId;
        this.slotNoExcludeZero = slotNo;

        if(slotNo.length() == 1){
            this.slotNo = "00" + slotNo;
        }
        else if(slotNo.length() == 2){
            this.slotNo = "0" + slotNo;
        }
        else{
            this.slotNo = slotNo;
        }

        String[] string = date.toLocalDate().toString().split("-");
        StringBuilder sb = new StringBuilder();
        sb.append(string[0]);
        sb.append(string[1]);
        sb.append(string[2]);
        this.date = sb.toString();
    }

//    public String getMacro(){
//        //PPID[0TT_EWIM_NO_CHHP]_LOT[LP22024100315_PJ2@89654577]_WAFER[18].smf
//        return "PPID"+"["+this.PPID+"]_LOT["+this.lotId+"]_WAFER["+this.slotNoExcludeZero+"].smf";
//    }

    private String getFileBaseName(){
        StringBuilder sb = new StringBuilder();
        sb.append("/PPID[");
        sb.append(PPID);
        sb.append("]_LOT[");
        sb.append(lotId);
        sb.append("]_WAFER[");
        sb.append(slotNoExcludeZero);
        sb.append("]");
        return sb.toString();
    }

    public String getSmfPath(String base){
        //   /{base}/PPID[{ppid}]_LOT[{lotId}]_WAFER[{slotNo}].smf
        StringBuilder sb = new StringBuilder();
        sb.append(base);
        sb.append(getFileBaseName());
        sb.append(".smf");
        return sb.toString();
    }



    public String getInPath() {
        StringBuilder sb = new StringBuilder();
        sb.append(getBasePath(this.in));
        sb.append("/" + in);
        sb.append(getCommonPath());
        sb.append("/Macro[Inspection]");
        return sb.toString();
    }

    public String getOutPath(){
        StringBuilder sb = new StringBuilder();
        sb.append(getBasePath(this.out));
        sb.append("/" + out);
        sb.append(getCommonPath());
        sb.append("/Macro[Inspection]");
        return sb.toString();
    }

    public String getEwimPath(){
        StringBuilder sb = new StringBuilder();
        sb.append(getBasePath(this.ewim));
        sb.append("/" + ewim);
        sb.append(getCommonPath());
        sb.append("/Macro[Inspection]");
        return sb.toString();
    }

    public String getEwimPathEBR(){
        StringBuilder sb = new StringBuilder();
        sb.append(getBasePath(this.ewim));
        sb.append("/" + ewim);
        sb.append(getCommonPath());
        sb.append("/EBR");
        return sb.toString();
    }

    private String getCommonPath(){
        StringBuilder sb = new StringBuilder();
        // /InVision/SaveDate/{date}/{lotId}[{ppid}]-{lotSeq}/{slotNo}
        sb.append("/InVision/SaveData");
        sb.append("/");
        sb.append(date);
        sb.append("/");
        sb.append(lotId);
        sb.append("[");
        sb.append(PPID);
        sb.append("]");
        sb.append("-");
        sb.append(lotSeq);
        sb.append("/");
        sb.append(slotNoExcludeZero);
        return sb.toString();
    }

}
