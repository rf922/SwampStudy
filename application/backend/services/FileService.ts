import * as AWS from "aws-sdk";
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({ signatureVersion: "v4" });
const urlExtra = "++++++++++";

const generateUrl = async (filename, bucketPath) => {
  let signedUrl;
  const publicUrl = getPublicUrl(filename, bucketPath);
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${bucketPath}/${filename}`,
    Expires: 60,
    //ACL: "public-read",
  };

  try {
    signedUrl = await s3.getSignedUrlPromise("putObject", params);
  } catch (err) {
    console.error(`Error generating pre-signed URL: ${err.message}`);
    throw new Error("Error generating pre-signed URL");
  }
  return [signedUrl, publicUrl];
};

const getPublicUrl = (filename, bucketPath) => {
  const publicUrl = `https://swampstudy.s3.us-west-1.amazonaws.com/${bucketPath}/${filename.trim()}${urlExtra}`;
  return publicUrl;
};

export default generateUrl;
