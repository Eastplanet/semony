package com.semony.integrated.presentation;

import com.semony.integrated.domain.dto.image.IPU;
import com.semony.integrated.domain.dto.image.ImageData;
import com.semony.integrated.domain.dto.image.ImageSet;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import javax.imageio.ImageIO;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {

    @GetMapping("/images")
    public ImageSet getImagesAsBase64() {
        List<Map<String, String>> base64Images = new ArrayList<>();
        String folderPath = "static/images";
        File folder = null;

        ImageSet imageSet = new ImageSet();

        try {
            folder = new ClassPathResource(folderPath).getFile();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Map<String, List<ImageData>> groupData = new HashMap<>();

        if (folder.exists() && folder.isDirectory()) {
            File[] imageFiles = folder.listFiles();



            if (imageFiles != null) {
                for (File imageFile : imageFiles) {
                    try {
                        String base64Image;
                        if (imageFile.getName().toLowerCase().endsWith(".tif")) {
                            // Read the .tif file and convert to BufferedImage
                            BufferedImage tifImage = ImageIO.read(imageFile);

                            // Convert BufferedImage to .jpeg format in memory
                            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                                ImageIO.write(tifImage, "jpeg", outputStream);
                                byte[] jpegBytes = outputStream.toByteArray();
                                base64Image = Base64.getEncoder().encodeToString(jpegBytes);
                            }
                        } else {
                            // For other image types, read and encode directly
                            try (FileInputStream inputStream = new FileInputStream(imageFile)) {
                                byte[] imageBytes = inputStream.readAllBytes();
                                base64Image = Base64.getEncoder().encodeToString(imageBytes);
                            }
                        }

                        // Remove the file extension from the file name for all file types
                        String fileNameWithoutExtension = imageFile.getName().replaceFirst("[.][^.]+$", "");
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

                        // Map the file name and Base64 string
                        Map<String, String> imageMap = new HashMap<>();
                        imageMap.put("fileName", fileNameWithoutExtension);
                        imageMap.put("base64", base64Image);

                        base64Images.add(imageMap);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }

        List<Entry<String, List<ImageData>>> list = groupData.entrySet().stream().toList();

        List<IPU> ipuList = new ArrayList<>();

        for(Entry<String, List<ImageData>> entry : list){
            IPU ipu = new IPU();
            ipu.setIpuNum(Integer.parseInt(entry.getKey()));
            ipu.setImages(entry.getValue());
            ipuList.add(ipu);
        }

        imageSet.setIpus(ipuList);

        return imageSet;
    }
}
