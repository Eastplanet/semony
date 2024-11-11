package com.semony.integrated.application.image;

import com.semony.integrated.application.PathFinder;
import com.semony.integrated.domain.dto.image.IPU;
import com.semony.integrated.domain.dto.image.ImageData;
import com.semony.integrated.domain.dto.image.ImageSet;
import com.semony.integrated.domain.entity.FlowRecipe;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Component;

@Component
public class ImageEncoderUsingMountedFolder implements ImageEncoder {

    @Override
    public List<ImageSet> encodeSummary(String lotId, BigDecimal lotSeq, String flowRecipe,
        String slotNo, LocalDateTime date) {
        PathFinder pathFinder = new PathFinder(FlowRecipe.findByPpid(flowRecipe), lotSeq.toString(),
            lotId, slotNo, date);

        List<ImageSet> imageSets = new ArrayList<>();

        for (int i = 0; i < 3; i++) {

            ImageSet imageSet = new ImageSet();

            String path = null;
            String ebrPath = null;

            switch (i) {
                case 0:
                    path = pathFinder.getInPath();
                    break;
                case 1:
                    path = pathFinder.getEwimPath();
                    ebrPath = pathFinder.getEwimPathEBR();
                    break;
                case 2:
                    path = pathFinder.getOutPath();
                    break;
            }

            // Golden 가져오기
            ImageData imageData = new ImageData();
            imageData.setFileName("Golden");
            imageData.setData(getFile(path, "Golden.jpg"));
            imageSet.setGolden(imageData);

            // Macro 가져오기
            imageData = new ImageData();
            imageData.setFileName("Macro");
            imageData.setData(getFile(path, "Thumbnail"));
            imageSet.setMacro(imageData);


            // i==1 EWIM 모듈인 경우 EBR 가져오기
            if(i==1){
                imageData = new ImageData();
                imageData.setFileName("EBR");
                imageData.setData(getFile(ebrPath, "EBR"));
                imageSet.setEBR(imageData);
            }
            imageSets.add(imageSet);
        }

        return imageSets;
    }

    @Override
    public List<ImageSet> encode(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo,
        LocalDateTime date) {

        PathFinder pathFinder = new PathFinder(FlowRecipe.findByPpid(flowRecipe), lotSeq.toString(),
            lotId, slotNo, date);

//        FileSystemResource resource = new FileSystemResource("../../var/libs/data/nfs_shared/MIW7-51 (IN)/InVision/SaveData/20241003/LP22024100315_PJ2@89654577[0TT_EWIM_NO_CHHP]-727939436/018/Macro[Inspection]/IPU_Patch");
//
//        if (!resource.exists()) {
//            throw new RuntimeException("폴더를 찾을 수 없습니다: " + resource);
//        }

//        System.out.println(Arrays.stream(resource.getFile().listFiles()).count());

        List<ImageSet> imageSets = new ArrayList<>();

        for (int i = 0; i < 3; i++) {

            ImageSet imageSet = new ImageSet();

            String path = null;
            String ebrPath = null;

            switch (i) {
                case 0:
                    path = pathFinder.getInPath();
                    break;
                case 1:
                    path = pathFinder.getEwimPath();
                    ebrPath = pathFinder.getEwimPathEBR();
                    break;
                case 2:
                    path = pathFinder.getOutPath();
                    break;
            }

            // Golden 가져오기
            ImageData imageData = new ImageData();
            imageData.setFileName("Golden");
            imageData.setData(getFile(path, "Golden.jpg"));
            imageSet.setGolden(imageData);

            // Macro 가져오기
            imageData = new ImageData();
            imageData.setFileName("Macro");
            imageData.setData(getFile(path, "Thumbnail"));
            imageSet.setMacro(imageData);

            // IPU 가져오기
            List<IPU> ipuList = new ArrayList<IPU>();
            Map<String, List<ImageData>> groupData = getIPU(path);
            if(groupData != null) {
                for (Map.Entry<String, List<ImageData>> entry : groupData.entrySet()) {
                    IPU ipu = new IPU();
                    ipu.setIpuNum(Integer.parseInt(entry.getKey()));
                    ipu.setImages(entry.getValue());
                    ipuList.add(ipu);
                }
                imageSet.setIpus(ipuList);
            }


            // i==1 EWIM 모듈인 경우 EBR 가져오기
            if(i==1){
                imageData = new ImageData();
                imageData.setFileName("EBR");
                imageData.setData(getFile(ebrPath, "EBR"));
                imageSet.setEBR(imageData);
            }
            imageSets.add(imageSet);
        }

        return imageSets;
    }

    private String getFile(String base, String findFile) {

        FileSystemResource resource = new FileSystemResource(base);

        if (!resource.exists()) {
            throw new RuntimeException("폴더를 찾을 수 없습니다: " + base);
        }

        File[] files = resource.getFile().listFiles();

        for (File file : files) {
            if (file.getName().contains(findFile)) {
                try {
//                    byte[] bytes = Files.readAllBytes(file.toPath());
//                    return Base64.getEncoder().encodeToString(bytes);
                    // 이미지 파일을 BufferedImage로 읽기
                    BufferedImage image = ImageIO.read(file);
                    if (image == null) {
                        throw new IOException("파일 형식을 변환할 수 없음: " + file.getName());
                    }

                    // JPEG로 변환
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    ImageIO.write(image, "jpeg", baos);

                    // Base64 인코딩 후 반환
                    byte[] jpegBytes = baos.toByteArray();
                    return Base64.getEncoder().encodeToString(jpegBytes);


                } catch (IOException e) {
                    e.printStackTrace();
                }
                break;
            }
        }

        return null;
    }



    private Map<String, List<ImageData>> getIPU(String base) {

        base = base + "/IPU_Patch";
        FileSystemResource resource = new FileSystemResource(base);

        if (!resource.exists()) {
           return null;
        }

        File[] files = resource.getFile().listFiles();

        Map<String, List<ImageData>> groupData = new HashMap<>();

        for (File file : files) {

            try {
                String fileNameWithoutExtension = file.getName().split("\\.")[0];
//                System.out.println(file.toPath());
//                String data = Base64.getEncoder().encodeToString(Files.readAllBytes(file.toPath()));


                BufferedImage image = ImageIO.read(file);
                if (image == null) {
                    throw new IOException("파일 형식을 변환할 수 없음: " + file.getName());
                }

                // JPEG로 변환
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(image, "jpeg", baos);

                // Base64 인코딩 후 반환
                byte[] jpegBytes = baos.toByteArray();
                String data = Base64.getEncoder().encodeToString(jpegBytes);

                //123

                ImageData imageData = new ImageData();
                imageData.setFileName(fileNameWithoutExtension);
                imageData.setData(data);

                String[] num = fileNameWithoutExtension.split("_");
                String group = num[0];

                if (groupData.containsKey(group)) {
                    groupData.get(group).add(imageData);
                } else {
                    List<ImageData> list = new ArrayList<>();
                    list.add(imageData);
                    groupData.put(group, list);
                }

            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }

        return groupData;
    }

}