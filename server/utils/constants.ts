import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URL = process.env.MONGODB_URI;
