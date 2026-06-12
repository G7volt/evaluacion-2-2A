import dotenv from "dotenv";

dotenv.config();

export const config = {
    db: {
        URL: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    JWT: {
        SECRET: process.env.JWT_SECRET_KEY
    },
    email: {
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    },
    cloudinary:{
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
}