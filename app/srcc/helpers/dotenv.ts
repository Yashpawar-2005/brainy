import dotenv from 'dotenv'
dotenv.config();
export const port=process.env.PORT
export const Start=process.env.STARTPOINT
export const RELATIONAL_DB_URL=process.env.RELATIONAL_DB_URL
export const JWT_SECRET=process.env.JWT_SECRET
export const CHROMA_DB_URL=process.env.CHROMA_DB_URL
export const YOUTUBE_TRANS_URL=process.env.YOUTUBE_TRANS_URL
export const RAPID_API=process.env.RAPID_API
export const RAPID_HOST=process.env.RAPID_HOST
export const GEMINI_API_KEY=process.env.GEMINI_API_KEY