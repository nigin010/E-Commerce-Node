import { ManagedUpload } from "aws-sdk/clients/s3";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId : `AKIAWGVAARJF5NVOT5RG`,
    secretAccessKey : `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`,
});

export const s3UploadAsync = (params: AWS.S3.PutObjectRequest): Promise<ManagedUpload.SendData["Location"]> => {
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  };