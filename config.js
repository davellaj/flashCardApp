import dotenv from 'dotenv';

dotenv.config();

exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT || 8080;

exports.GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
