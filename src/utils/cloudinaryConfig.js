import multer from "multer";
import {v2 as Cloudinary} from "Cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";

import {config} from "../../config.js"

Cloudinary.config({
    cloud_name: config.Cloudinary.CLOUD_NAME,
    API_KEY: config.Cloudinary.API_KEY,
    API_SECRET: config.Cloudinary.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    Params: {
        folder: "evaluacion2A",
        allowed_formats: ["jpg", "png", "jpeg", "webp", "svc", "pdf"]
    }
})

const upload = multer({storage});
export default upload