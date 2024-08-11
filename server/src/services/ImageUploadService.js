
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

const IAMKEY = process.env.AWS_IAM_ACCESS_KEY
const SECRET = process.env.AWS_SECRET_KEY

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_S3_BUCKET

const client = new S3Client({
    region: region,
    credentials: { accessKeyId: process.env.AWS_TOKEN_ID, secretAccessKey: process.env.AWS_TOKEN_SECRET }
})
class ImageUploadService {
    async uploadImageWithSharp(file, userId) {
        const sharpImage = sharp(file.data)
        const metadata = await sharpImage.metadata()
        // const shrunkImage = sharpImage.resize(metadata.width * .5)
        const webpImage = sharpImage.webp({ quality: 70, nearLossless: false })
        file.data = await webpImage.toBuffer()
        file.name = file.name.split('.')[0] + '.webp'
        file.mimetype = 'image/webp'
        if (file.data.length > 200 * 1024) throw new Error(`Image size is too large ${file.data.length}`)
        const upload = await this.uploadImage(file, userId)
        return upload
    }
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