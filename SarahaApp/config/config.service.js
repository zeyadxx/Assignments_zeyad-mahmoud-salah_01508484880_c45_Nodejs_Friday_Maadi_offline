import dotenv from "dotenv";
import {resolve} from "node:path";

const envPath={
    Dev:"./config/.env.dev"
}
dotenv.config({path:resolve(`${envPath.Dev}`)})

export const PORT=process.env.PORT||6000;
export const DB_URL=process.env.DB_URL
export const SALT=Number(process.env.SALT)

export const SECRET_KEY=process.env.ECRYPTION_SECRET_KEY

export const TOKEN_SECRET_KEY=process.env.TOKEN_SECRET_KEY
export const TOKEN_EXPIRE_TIME=process.env.TOKEN_EXPIRE_TIME
export const REFRESH_TOKEN_SECRET_KEY=process.env.REFRESH_TOKEN_SECRET_KEY
export const REFRESH_TOKEN_EXPIRE_TIME=process.env.REFRESH_TOKEN_EXPIRE_TIME

export const TOKEN_USER_SECRET_KEY=process.env.TOKEN_USER_SECRET_KEY
export const REFRESH_TOKEN_USER_SECRET_KEY=process.env.REFRESH_TOKEN_USER_SECRET_KEY


export const TOKEN_ADMIN_SECRET_KEY=process.env.TOKEN_ADMIN_SECRET_KEY
export const REFRESH_TOKEN_ADMIN_SECRET_KEY=process.env.REFRESH_TOKEN_ADMIN_SECRET_KEY

export const TOKEN_MANAGER_SECRET_KEY=process.env.TOKEN_MANAGER_SECRET_KEY
export const REFRESH_TOKEN_MANAGER_SECRET_KEY=process.env.REFRESH_TOKEN_MANAGER_SECRET_KEY




