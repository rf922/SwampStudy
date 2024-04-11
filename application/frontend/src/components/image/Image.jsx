import axios from "axios";
import { useState } from "react";
const Image = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const onFileInput = async (e) => {
    const timestamp = new Date().getTime();
    const file = e.target.files[0];
    const filename =
      file.name
        .split(".")[0]
        .replace(/[&/\\#,+()$~%'":*?<>{}]/g, "")
        .toLowerCase() + `_${timestamp}`;
    const fileExtension = file.name.split(".").pop();

    await uploadImage(`${filename}.${fileExtension}`, file);
  };

  const uploadImage = async (filename, file) => {
    const foldersPath = "test/test1";
    const options = { headers: { "Content-Type": file.type } };

    try {
      const s3Urls = await axios
        .get(
          `${process.env.REACT_APP_API_URL}/file?filename=${filename}
          &path=${foldersPath}&contentType=${file.type}`,
        )
        .then((response) => response.data?.urls);

      console.log(s3Urls);

      if (!s3Urls[0]) {
        throw new Error("S3 signed URL not defined");
      }

      await axios.put(s3Urls[0], file, options);
      console.log("Sent the image");
      console.log(s3Urls[1]);
      setImageUrl(s3Urls[1]);
    } catch (err) {
      console.error(`Error uploading image: ${err.message}`);
    }
  };

  return (
    <div>
      <input type="file" id="file_input" onChange={onFileInput} />
      {imageUrl && (
        <div className="result">
          <a href={imageUrl} className="image-url" target="_blankד">
            Uploaded Image
          </a>
        </div>
      )}
    </div>
  );
};

export default Image;
