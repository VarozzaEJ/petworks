import fileUpload from "express-fileupload";
import BaseController from "../utils/BaseController.js";
import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import { imageUploadService } from "../services/ImageUploadService.js";


export class ImageUploadController extends BaseController {
    constructor() {
        super('api/upload')
        this.router
            .use(fileUpload())
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.uploadImage)

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