import fileUpload from "express-fileupload";
import BaseController from "../utils/BaseController.js";
import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import { imageUploadService } from "../services/ImageUploadService.js";


export class ImageUploadController extends BaseController {
    constructor() {
        super('api/upload')
        this.router
            // .use(fileUpload({ limits: { fileSize: 1 * 1024 * 1024 } }))
            .use(fileUpload())
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.uploadImage)
            .post('/sharp', this.uploadImageWithSharp)

    }
    async uploadImageWithSharp(request, response, next) {
        try {
            const file = request.files.image
            const userId = request.userInfo.id
            const uploadedImage = await imageUploadService.uploadImageWithSharp(file, userId)
            response.send(uploadedImage)
        } catch (error) {
            next(error)
        }
    }

    async uploadImage(request, response, next) {
        try {
            console.log(request.files.image)
            const userId = request.userInfo.id
            const uploadedImage = await imageUploadService.uploadImage(request.files.image, userId)
            response.send(uploadedImage)
        } catch (error) {
            next(error)
        }
    }
}