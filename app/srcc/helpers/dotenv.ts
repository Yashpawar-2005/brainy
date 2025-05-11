import dotenv from 'dotenv'
dotenv.config();
export const port=process.env.PORT
export const Start=process.env.STARTPOINT
export const RELATIONAL_DB_URL=process.env.RELATIONAL_DB_URL
export const JWT_SECRET=process.env.JWT_SECRET