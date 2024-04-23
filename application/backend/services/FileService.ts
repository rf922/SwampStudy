import * as AWS from "aws-sdk";

export class FileService {
  private s3: AWS.S3;
  private bucketName: string;
  private urlExtra: string = "++++++++++";

  constructor(s3: AWS.S3, bucketName: string) {
    this.s3 = s3;
    this.bucketName = bucketName;
  }

  public async generateUrl(filename, bucketPath) {
    let signedUrl;
    const publicUrl = await this.getPublicUrl(filename, bucketPath);
    const params = {
      Bucket: this.bucketName,
      Key: `${bucketPath}/${filename}`,
      Expires: 60,
      //ACL: "public-read",
    };

    try {
      signedUrl = await this.s3.getSignedUrlPromise("putObject", params);
      return [signedUrl, publicUrl];
    } catch (err) {
      console.error(`Error generating pre-signed URL: ${err.message}`);
      throw new Error("Error generating pre-signed URL");
    }
  }

  /**
   * helper method returns the public url
   * @param filename
   * @param bucketPath
   * @returns
   */
  private async getPublicUrl(filename, bucketPath) {
    const publicUrl = `https://swampstudy.s3.us-west-1.amazonaws.com/${bucketPath}/${filename.trim()}${this.urlExtra}`;
    return publicUrl;
  }
}
