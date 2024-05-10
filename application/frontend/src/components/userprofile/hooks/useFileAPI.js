import React, { useState } from "react";
import axios from "axios";

export const useFileAPI = () => {
  //usefilleapi hook for getting and uploading img files
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [file, setFile] = useState(null);

  const getFormattedFileName = async (fileName) => {
    //sanitize the name and format
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

  const uploadImage = async (file) => {
    const fileName = await getFormattedFileName(file.name);
    const foldersPath = "profiles";
    const options = { headers: { "Content-Type": file.type } };

    try {
      //getting the signed and pub url
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

  const handleFileInputChange = (e) => {
    //update img preview on upload
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };

      setFile(file);
      reader.readAsDataURL(file);
      return file;
    }
    return null;
  };
  return {
    file,
    handleFileInputChange,
    uploadImage,
    imagePreviewUrl,
    setImagePreviewUrl,
  };
};
