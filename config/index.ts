const port = process.env.PORT || 5000;
const dbLogin = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;

const config = {
  dbLogin,
  dbPassword,
  port,
  jwtSecret,
  databaseUri: `mongodb+srv://${dbLogin}:${dbPassword}@personal-training-management-uzusc.mongodb.net/test?retryWrites=true&w=majority`
};

export default config;
