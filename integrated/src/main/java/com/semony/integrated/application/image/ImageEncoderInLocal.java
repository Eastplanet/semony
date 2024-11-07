package com.semony.integrated.application.image;

import com.semony.integrated.domain.dto.image.IPU;
import com.semony.integrated.domain.dto.image.ImageData;
import com.semony.integrated.domain.dto.image.ImageSet;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;
import java.util.Base64;

@Component
public class ImageEncoderInLocal implements ImageEncoder {

    public ImageSet encode(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo) {
        String folderPath = "static/images";
        ImageSet imageSet = new ImageSet();
        Map<String, List<ImageData>> groupData = new HashMap<>();

        ClassPathResource resource = new ClassPathResource(folderPath);
        if (!resource.exists()) {
            throw new RuntimeException("Resource folder not found: " + folderPath);
        }

        // static/images 폴더 내의 파일 리스트를 가져오는 부분을 추가로 구현해야 합니다.
        // ClassPathResource를 사용한 파일 목록 조회는 Spring Boot의 .jar 패키지 구조에서 제한이 있으므로,
        // 모든 파일 이름을 미리 하드코딩하거나, 애플리케이션 실행 전에 해당 파일들을 로드하는 방법이 필요할 수 있습니다.

        List<String> fileNames = Arrays.asList("0001_bin.TIF", "0001_golden.TIF","0001_ins.TIF","0001_psm.TIF","EBR_RESULT.BMP","Golden.jpg","PPID[0TT_EWIM_NO_CHHP]_LOT[LP22024100315_PJ2@89654577]_WAFER[10]_Thumbnail_Macro[Inspection].BMP"); // 실제 파일 이름을 추가
        for (String fileName : fileNames) {
            try (InputStream inputStream = new ClassPathResource(folderPath + "/" + fileName).getInputStream()) {
                byte[] imageBytes = inputStream.readAllBytes();
                String base64Image = Base64.getEncoder().encodeToString(imageBytes);


                String fileNameWithoutExtension = fileName.replaceFirst("[.][^.]+$", "");
                if(fileNameWithoutExtension.contains("PPID")){
                    fileNameWithoutExtension = "MACRO";

                    ImageData data = new ImageData();
                    data.setFileName(fileNameWithoutExtension);
                    data.setData(base64Image);
                    imageSet.setMacro(data);

                }
                else if(fileNameWithoutExtension.contains("EBR")){
                    fileNameWithoutExtension = "EBR";

                    ImageData data = new ImageData();
                    data.setFileName(fileNameWithoutExtension);
                    data.setData(base64Image);
                    imageSet.setEBR(data);
                }
                else if(fileNameWithoutExtension.contains("Golden")){
                    fileNameWithoutExtension = "Golden";

                    ImageData data = new ImageData();
                    data.setFileName(fileNameWithoutExtension);
                    data.setData(base64Image);
                    imageSet.setGolden(data);
                }
                else{

                    ImageData data = new ImageData();
                    data.setFileName(fileNameWithoutExtension);
                    data.setData(base64Image);

                    String[] num = fileNameWithoutExtension.split("_");
                    String group = num[0];

                    if(groupData.containsKey(group)){
                        groupData.get(group).add(data);
                    }
                    else{
                        List<ImageData> list = new ArrayList<>();
                        list.add(data);
                        groupData.put(group, list);
                    }

                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // 그룹 데이터를 IPU 형식으로 변환
        List<IPU> ipuList = new ArrayList<>();
        for (Map.Entry<String, List<ImageData>> entry : groupData.entrySet()) {
            IPU ipu = new IPU();
            ipu.setIpuNum(Integer.parseInt(entry.getKey()));
            ipu.setImages(entry.getValue());
            ipuList.add(ipu);
        }

        imageSet.setIpus(ipuList);

        return imageSet;
    }
}
