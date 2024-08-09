
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


const IAMKEY = process.env.AWS_IAM_ACCESS_KEY
const SECRET = process.env.AWS_SECRET_KEY

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_S3_BUCKET

const client = new S3Client({
    region: region,
    credentials: { accessKeyId: process.env.AWS_TOKEN_ID, secretAccessKey: process.env.AWS_TOKEN_SECRET }
})
class ImageUploadService {
    async uploadImage(file, userId) {
        const uploadRequest = new PutObjectCommand({
            Bucket: bucketName,
            Key: `${userId}/${file.name}`,

            Body: file.data,
            ContentType: file.mimetype,
            CacheControl: 'max-age=36000'
        })
        const response = await client.send(uploadRequest)
        console.log('uploaded completed', response)
        let string = `https://petworksimages.s3.us-west-2.amazonaws.com/${userId}/${file.name}`
        console.log(string)
        return string
    }
}

export const imageUploadService = new ImageUploadService()