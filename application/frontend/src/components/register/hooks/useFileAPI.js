import React, { useState } from "react";
import axios from "axios";

export const useFileAPI = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const getFormattedFileName = async (fileName) => {//formats and forms the absolute filename
    const timestamp = new Date().getTime(); 
    const ext = fileName.split(".").pop();
    const formattedFileName =
      fileName
        .split(".")[0]
        .replace(/[&/\\#,+()$~%'":*?<>{}]/g, "")
        .toLowerCase() + `_${timestamp}`;

    const fileNameWithExt = `${formattedFileName}.${ext}`;
    return fileNameWithExt;
  };

  const uploadImage = async (file) => {//handles image upload logic
    const fileName = await getFormattedFileName(file.name);
    const foldersPath = "profiles";
    const options = { headers: { "Content-Type": file.type } };

    try {
      const s3Urls = await axios
        .get(
          `${process.env.REACT_APP_API_URL}/file?filename=${fileName}&path=${foldersPath}&contentType=${file.type}`,
        )
        .then((response) => response.data?.urls);

      if (!s3Urls || !s3Urls[0]) {
        throw new Error("S3 signed URL not defined");
      }

      await axios.put(s3Urls[0], file, options);
      return s3Urls[1]; // return the URL of the uploaded image
    } catch (err) {
      console.error(`Error uploading image: ${err.message}`);
      throw err;
    }
  };

  const handleFileInputChange = (e) => {//on file inpit change updates the prevw url
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      return file;
    }
    return null;
  };
  return { handleFileInputChange, uploadImage, imagePreviewUrl };
};
