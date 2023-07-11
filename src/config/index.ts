export const COOKIE_NAME = process.env.COOKIE_TOKEN_NAME || 'elementor-cookie';
export const PORT = process.env.PORT || 4000;
export const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017';
export const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || 'elementor-test';
export const DEV = process.env.NODE_ENV === 'development';
